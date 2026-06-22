import { useRef, useState } from "react";
import {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  GEMINI_API_REVISION,
} from "../utils/constants";

const GPTSearchBar = () => {
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const handleGPTSearchClick = async () => {
    const query = searchInputRef.current?.value?.trim();
    if (!query) return;

    setIsLoading(true);
    try {
      // Send request to local proxy to avoid CORS and keep API key server-side.
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          model: GEMINI_MODEL,
          temperature: 0.2,
          candidate_count: 1,
        }),
      });

      // Read raw text first (some error responses are non-JSON)
      const respText = await response.text();
      let data;
      try {
        data = respText ? JSON.parse(respText) : {};
      } catch (parseErr) {
        console.error(
          "Gemini returned non-JSON response",
          response.status,
          respText,
        );
        throw new Error(
          `Gemini non-JSON response (${response.status}): ${respText}`,
        );
      }

      if (!response.ok) {
        console.error("Gemini API error", response.status, data);
        throw new Error(
          `Gemini API request failed (${response.status}): ${JSON.stringify(data)}`,
        );
      }

      console.debug("Gemini full response:", data);

      const raw =
        data?.steps
          ?.find((step) => step.type === "model_output")
          ?.content?.map((item) => item.text || "")
          .join("") ||
        data?.output_text ||
        "";

      let movieList;
      try {
        movieList = JSON.parse(raw);
        if (!Array.isArray(movieList))
          throw new Error("Parsed result is not an array");
      } catch (e) {
        movieList = raw
          .split(/\r?\n/)
          .map((s) => s.replace(/^\d+[\).\-\s]*/, "").trim())
          .filter(Boolean)
          .slice(0, 5);
      }

      setMovieList(movieList);
    } catch (error) {
      console.error("Gemini request failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form
        className="w-full max-w-2xl mx-auto mt-8"
        onSubmit={(e) => e.preventDefault()}
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
            onClick={handleGPTSearchClick}
            disabled={isLoading}
            className="w-full basis-1/4 bg-purple-600 cursor-pointer h-14 text-white py-3 rounded font-semibold hover:bg-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      <div className="mt-6">
        {isLoading && <p className="text-gray-300">Searching...</p>}
        {!isLoading && movieList?.length === 0 && (
          <p className="text-gray-400">
            No results yet. Try searching for a movie.
          </p>
        )}
        {!isLoading && movieList?.length > 0 && (
          <div className="bg-gray-900 p-4 rounded mt-4">
            <h4 className="text-white font-semibold mb-2">Recommendations</h4>
            <ul className="list-disc list-inside text-gray-200">
              {movieList.map((m, idx) => (
                <li key={idx} className="py-1">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPTSearchBar;
