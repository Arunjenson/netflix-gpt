import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMainTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

export const useMainTrailer = ({ movieId }) => {
  const dispatch = useDispatch();
  const mainTrailerVideo = useSelector(
    (store) => store.movies.mainTrailerVideo,
  );
  const mainTrailerMovieId = useSelector(
    (store) => store.movies.mainTrailerMovieId,
  );

  useEffect(() => {
    if (!movieId) return;
    if (mainTrailerVideo && mainTrailerMovieId === movieId) return;

    const getVideoBackground = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS,
        );
        const data = await response.json();
        const trailers = data.results.filter(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.official === true,
        );
        const bgVideo = trailers.length > 0 ? trailers[0] : data.results[0];
        dispatch(addMainTrailer({ video: bgVideo, movieId }));
      } catch (error) {
        console.error("Error fetching video background:", error);
      }
    };

    getVideoBackground();
  }, [dispatch, movieId, mainTrailerVideo, mainTrailerMovieId]);
};
