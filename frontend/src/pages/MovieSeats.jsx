import {
  Background,
  Button,
  Card,
  CardList,
  DateList,
  Navbar,
  ShowDetails,
  ShowsLeft,
  ShowsRight,
  TheatreList,
  TimeList,
  SeatGrid,
  CostPreview,
} from "hyperverge-sde-ui-library";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./../assets/logo.png";
import { useNavigate, useParams } from "react-router";

import {
  deselectedSeat,
  selectedSeat,
  selectedShow,
  someoneElseDeselectedSeat,
  someoneElseDeselectedSeats,
  someoneElseSelectedSeat,
  someoneElseSelectedSeats,
  unsubscribeShowSeats,
} from "../feature/showSlice";
import { mainSocket } from "../socket";
import { registerShowSocket } from "../utils/registerShowSocket";

export default function Shows({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { startTimeTimestamp, movie, seatMatrix, id } = useSelector(
  //   (state) => state.show.selectedShow
  // );
  const { movie_id, show_id } = useParams();
  const { seatMatrix } = useSelector((state) => state.show.selectedShow);

  useEffect(registerShowSocket(show_id, dispatch), []);

  // const ranOnce = useRef(false);
  // useEffect(() => {
  //   if ((!movie || !startTimeTimestamp || !seatMatrix) && !ranOnce.current) {
  //     ranOnce.current = true;
  //     navigate(-1);
  //   }
  // }, [movie]);
  const selectedSeats = [];
  seatMatrix.forEach((row, rowIndex) => {
    row.forEach((seatVal, colIndex) => {
      if (seatVal == 1) {
        selectedSeats.push((rowIndex * 10 + colIndex + 1).toString());
      }
    });
  });

  return (
    <>
      <Background classname="-z-10" />
      <div className="h-screen overflow-y-scroll">
        <div className=" md:h-full overflow-x-scroll  z-20 relative font-bold  flex flex-col justify-between items-center">
          <div className="  text-white w-full flex justify-center md:justify-start items-center text-[36px] font-primary font-semibold px-[94px] py-[68px] ">
            Seat
          </div>
          <div className=" p-4 w-full overflow-x-scroll flex   justify-start sm:justify-center items-start mb-10 md:mb-0">
            <SeatGrid
              seatArray={seatMatrix}
              onSeatClick={(rowIndex, colIndex) => {
                if (seatMatrix[rowIndex][colIndex] == 0) {
                  dispatch(
                    selectedSeat({
                      showId: show_id,
                      seatNumber: rowIndex * 10 + colIndex + 1,
                    })
                  );
                } else if (seatMatrix[rowIndex][colIndex] == 1) {
                  dispatch(
                    deselectedSeat({
                      showId: show_id,
                      seatNumber: rowIndex * 10 + colIndex + 1,
                    })
                  );
                }
              }}
            />
          </div>
          <div className="w-full mt-auto bottom-0">
            <CostPreview
              seats={selectedSeats}
              className="w-full"
              onClickProceed={() => navigate("/booking")}
              onClickBack={() => navigate(`/movie/${movie_id}/shows`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
