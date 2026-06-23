import { API_OPTIONS } from "./constants";

export async function searchMovieByTitle(title) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&page=1`,
    API_OPTIONS,
  );
  const data = await res.json();
  return data.results?.[0] ?? null;
}

export async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    API_OPTIONS,
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function getMovieCredits(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
    API_OPTIONS,
  );
  if (!res.ok) throw new Error("Failed to fetch movie credits");
  return res.json();
}

export async function getMovieVideos(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    API_OPTIONS,
  );
  if (!res.ok) throw new Error("Failed to fetch movie videos");
  const data = await res.json();
  const trailers = data.results?.filter(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube" &&
      video.official === true,
  );
  return trailers?.length > 0 ? trailers[0] : data.results?.[0] ?? null;
}
