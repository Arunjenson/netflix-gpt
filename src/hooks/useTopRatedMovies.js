import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { topRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const useTopRatedMovies = () => {
     const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?npmpage=1",
        API_OPTIONS,
      );
      const data = await response.json();
      console.log("Top Rated Movies:", data.results);
      dispatch(topRatedMovies(data.results));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };
  useEffect(() => {
    getTopRatedMovies();
  }, []);

    
}