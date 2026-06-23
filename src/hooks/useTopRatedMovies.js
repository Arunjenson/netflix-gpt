import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { topRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMoviesList = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    if (topRatedMoviesList) return;

    const getTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS,
        );
        const data = await response.json();
        dispatch(topRatedMovies(data.results));
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    getTopRatedMovies();
  }, [dispatch, topRatedMoviesList]);
};
