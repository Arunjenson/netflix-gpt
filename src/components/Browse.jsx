import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?npmpage=1",
        API_OPTIONS,
      );
      const data = await response.json();
      console.log("Now Playing Movies:", data.results);
      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return (
    <>
      <Header />
      <div>Browse</div>
    </>
  );
};

export default Browse;
