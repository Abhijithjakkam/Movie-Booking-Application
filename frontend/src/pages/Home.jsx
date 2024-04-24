import {
  Background,
  Button,
  Card,
  CardList,
  Navbar,
  NowShowing,
} from "hyperverge-sde-ui-library";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedMovies } from "../feature/movieSlice";
import logo from "./../assets/logo.png";
import { useNavigate } from "react-router";
import { signOut } from "../utils/accountService";
import CameraModule from "./CameraModule";
import { changeModalState } from "../feature/utilsSlice";

export default function Home({}) {
  const movies = useSelector((state) => state.movie.recommendedMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecommendedMovies());
  }, []);
  const profilePicture = useSelector((state) => state.utils.profilePicture);
  const navigate = useNavigate();
  return (
    <>
      <Background classname="-z-100" />
      <CameraModule />

      <div>
        <div className="h-screen overflow-y-scroll z-20 relative font-bold">
          <Navbar
            profilePicture={profilePicture}
            handleProfileChange={() => dispatch(changeModalState())}
            handleNavigation={() => navigate("/")}
            isLoggedIn={true}
            onLogout={signOut}
            onMyTickets={() => {
              navigate("/mytickets");
            }}
          />
          <NowShowing>
            <CardList className="max-w-[1500px] mx-auto">
              {movies &&
                movies.map((movie) => (
                  <Card
                    key={movie.id}
                    cardName={movie.name}
                    imageUrl={movie.imageUrl}
                    onClick={() => navigate(`/movie/${movie.id}/shows`)}
                  />
                ))}
            </CardList>
          </NowShowing>
        </div>
      </div>
    </>
  );
}
