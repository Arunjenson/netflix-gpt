import { API_OPTIONS } from "./constants";

export async function searchMovieByTitle(title) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&page=1`,
    API_OPTIONS,
  );
  const data = await res.json();
  return data.results?.[0] ?? null;
}
