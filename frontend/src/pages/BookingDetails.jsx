import {
  Background,
  BookingDetails as BookingDetailsComponent,
} from "hyperverge-sde-ui-library";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BookingDetails({}) {
  const { startTimeTimestamp, movie, seatMatrix } = useSelector(
    (state) => state.show.selectedShow
  );
  const selectedSeats = [];
  seatMatrix.forEach((row, rowIndex) => {
    row.forEach((seatVal, colIndex) => {
      if (seatVal == 1) {
        selectedSeats.push((rowIndex * 10 + colIndex + 1).toString());
      }
    });
  });

  const ranOnce = useRef(false);

  useEffect(() => {
    if ((!movie || !startTimeTimestamp || !seatMatrix) && !ranOnce.current) {
      ranOnce.current = true;
      navigate(-1);
    }
  }, [movie]);

  const navigate = useNavigate();
  return (
    <>
      <Background classname="-z-100" />
      <div>
        <div className="h-screen overflow-y-scroll z-20 relative font-bold flex flex-col justify-center items-center">
          <BookingDetailsComponent
            date={startTimeTimestamp}
            title={movie?.name}
            tickets={selectedSeats}
            onCheckout={() => navigate("/sendotp")}
          />
        </div>
      </div>
    </>
  );
}
