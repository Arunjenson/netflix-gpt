import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../utils/tmdb";
import { setMovieDetails } from "../utils/movieSlice";

export function useMovieDetails(movieId) {
  const dispatch = useDispatch();
  const cached = useSelector(
    (store) => (movieId ? store.movies.movieDetailsCache[movieId] : null),
  );

  const [details, setDetails] = useState(cached?.details ?? null);
  const [credits, setCredits] = useState(cached?.credits ?? null);
  const [trailer, setTrailer] = useState(cached?.trailer ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setDetails(null);
      setCredits(null);
      setTrailer(null);
      setLoading(false);
      setError(null);
      return;
    }

    if (cached) {
      setDetails(cached.details);
      setCredits(cached.credits);
      setTrailer(cached.trailer);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchMovieData() {
      setLoading(true);
      setError(null);
      setDetails(null);
      setCredits(null);
      setTrailer(null);

      try {
        const [movieDetails, movieCredits, movieTrailer] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ]);

        if (!cancelled) {
          setDetails(movieDetails);
          setCredits(movieCredits);
          setTrailer(movieTrailer);
          dispatch(
            setMovieDetails({
              movieId,
              details: movieDetails,
              credits: movieCredits,
              trailer: movieTrailer,
            }),
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load movie details");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovieData();

    return () => {
      cancelled = true;
    };
  }, [movieId, cached, dispatch]);

  const cast = credits?.cast?.slice(0, 8) ?? [];
  const director =
    credits?.crew?.find((person) => person.job === "Director") ?? null;

  return { details, cast, director, trailer, loading, error };
}
