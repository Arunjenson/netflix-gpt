import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../utils/tmdb";

export function useMovieDetails(movieId) {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
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
  }, [movieId]);

  const cast = credits?.cast?.slice(0, 8) ?? [];
  const director =
    credits?.crew?.find((person) => person.job === "Director") ?? null;

  return { details, cast, director, trailer, loading, error };
}
