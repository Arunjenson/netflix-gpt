import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { popularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMoviesList = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (popularMoviesList) return;

    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS,
        );
        const data = await response.json();
        dispatch(popularMovies(data.results));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    getPopularMovies();
  }, [dispatch, popularMoviesList]);
};
