export const DEFAULT_PROFILE_IMAGE = "https://avatars.githubusercontent.com/u/116062066?v=4";

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDRlMmUzODc0ZjNlOTY1OTg2ZmM2YWI0Y2QwYjM3OSIsIm5iZiI6MTc4MTcwNjQ4MS40NTYsInN1YiI6IjZhMzJhZWYxMjVkMDY3YzZhOGQ5ZjI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fssXa7OGwEi1OiJPz0TFuWchiwb8czOkbWEXYdK93sU'
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780" 
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AQ.Ab8RN6JhZ4dIvONDcT2PBa6HSwXCbbizPM3nrQRuVnFwuAfugg";
export const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash";
export const GEMINI_API_REVISION = import.meta.env.VITE_GEMINI_API_REVISION || "2026-05-20";