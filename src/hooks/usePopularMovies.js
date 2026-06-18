import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { popularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const usePopularMovies = () => {
     const dispatch = useDispatch();
  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?npmpage=1",
        API_OPTIONS,
      );
      const data = await response.json();
        console.log("Popular Movies:", data.results);
      dispatch(popularMovies(data.results));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };
  useEffect(() => {
    getPopularMovies();
  }, []);

    
}