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
  MovieDetails,
} from "hyperverge-sde-ui-library";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedDateIndexInput,
  selectedMovie,
  selectedTheatreIndexInput,
  selectedTimeIndexInput,
} from "../feature/movieSlice";
import logo from "./../assets/logo.png";
import { useNavigate, useParams } from "react-router";
import { signOut } from "../utils/accountService";
import CameraModule from "./CameraModule";

export default function Shows({}) {
  const { movie_id } = useParams();

  const {
    name,
    imageUrl,
    description,
    durationInHours,
    durationInMinutes,
    listOfTheatres,
    selectedTheatreIndex,
    listOfDatesOfShowsOfSelectedTheatre,
    selectedDateIndex,
    listOfTimesOfShowsOfSelectedTheatreAndDate,
    selectedTimeIndex,
    selectedShow,
  } = useSelector((state) => state.movie.selectedMovie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedMovie(movie_id));
  }, []);

  console.log(
    listOfTheatres,
    listOfDatesOfShowsOfSelectedTheatre,
    listOfTimesOfShowsOfSelectedTheatreAndDate
  );
  const profilePicture = useSelector((state) => state.utils.profilePicture);
  const navigate = useNavigate();
  return (
    <>
      <Background classname="-z-100" />
      <CameraModule />

      <div>to Docker daemon  80.77MB

        <div className="h-screen overflow-y-scroll z-20 relative font-bold">
          <Navbar
            profilePicture={profilePicture}
            handleProfileChange={() => dispatch(changeModalState())}
            handleNavigation={() => navigate("/")}
            isLoggedIn={true}
            onLogout={signOut}
            hideMyTickets={true}
          />

          <div className="flex gap-10 md:g-0 flex-col md:flex-row w-screen justify-between py-[3.6rem] ">
            {listOfTheatres.length === 0 ? (
              <p className=" px-[6.25rem] w-full font-primary text-2xl   text-white">
                No shows Available
              </p>
            ) : (
              <ShowsLeft>
                <TheatreList
                  theatres={listOfTheatres}
                  selectedTheatreIndex={selectedTheatreIndex}
                  onClick={(index) =>
                    dispatch(selectedTheatreIndexInput(index))
                  }
                />
                <DateList
                  dates={listOfDatesOfShowsOfSelectedTheatre}
                  selectedDateIndex={selectedDateIndex}
                  onClick={(index) => dispatch(selectedDateIndexInput(index))}
                />
                <TimeList
                  times={listOfTimesOfShowsOfSelectedTheatreAndDate}
                  selectedTimeIndex={selectedTimeIndex}
                  onClick={(index) => dispatch(selectedTimeIndexInput(index))}
                />
              </ShowsLeft>
            )}

            <ShowsRight>
              <MovieDetails
                name={name}
                imageUrl={imageUrl}
                description={description}
                duration={durationInHours + "h " + durationInMinutes + "m"}
                type={"movie"}
              />
              {listOfTheatres.length === 0 ? null : (
                <ShowDetails
                  name={selectedShow?.theatre.name}
                  showStartTimeTimestamp={selectedShow?.startTimeTimestamp}
                  onProceed={() => {
                    if (selectedShow) {
                      navigate(
                        `/movie/${movie_id}/show/${selectedShow.id}/seats`
                      );
                    }
                  }}
                />
              )}
            </ShowsRight>
          </div>
        </div>
      </div>
    </>
  );
}
