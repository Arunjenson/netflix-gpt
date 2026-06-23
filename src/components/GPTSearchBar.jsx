import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGptMovies,
  setGptSearchLoading,
  setGptSearchError,
  clearGptMovies,
} from "../utils/gptSlice";
import { searchMovieByTitle } from "../utils/tmdb";

const GPTSearchBar = () => {
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const { gptSearchLoading, gptSearchError } = useSelector((state) => state.gpt);

  const handleGPTSearchClick = async () => {
    const query = searchInputRef.current?.value?.trim();
    if (!query) return;

    dispatch(clearGptMovies());
    dispatch(setGptSearchLoading(true));
    dispatch(setGptSearchError(null));

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          temperature: 0.2,
        }),
      });

      const respText = await response.text();
      let data;
      try {
        data = respText ? JSON.parse(respText) : {};
      } catch {
        throw new Error(
          `Gemini non-JSON response (${response.status}): ${respText}`,
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.details || `Gemini API request failed (${response.status})`,
        );
      }

      const titles = data.movies;
      if (!Array.isArray(titles) || titles.length === 0) {
        throw new Error("Gemini returned no movie titles");
      }

      const tmdbResults = await Promise.all(
        titles.map((title) => searchMovieByTitle(title)),
      );
      const movies = tmdbResults.filter(Boolean);

      if (movies.length === 0) {
        throw new Error("Could not find matching movies on TMDB");
      }

      dispatch(setGptMovies(movies));
    } catch (error) {
      console.error("Gemini request failed", error);
      dispatch(setGptSearchError(error.message || "Search failed"));
    } finally {
      dispatch(setGptSearchLoading(false));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form
        className="w-full max-w-2xl mx-auto mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleGPTSearchClick();
        }}
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="What movie are you looking for?"
            className="w-full basis-4/5 p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={gptSearchLoading}
            className="w-full basis-1/4 bg-purple-600 cursor-pointer h-14 text-white py-3 rounded font-semibold hover:bg-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gptSearchLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      {gptSearchError && (
        <p className="mt-4 text-red-400 text-sm">{gptSearchError}</p>
      )}
    </div>
  );
};

export default GPTSearchBar;
