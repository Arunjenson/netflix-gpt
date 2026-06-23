import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = ({ onMovieClick }) => {
  const { gptMovies, gptSearchLoading, gptSearchError } = useSelector(
    (state) => state.gpt,
  );

  if (gptSearchLoading) {
    return <p className="text-gray-300 mt-6">Finding recommendations...</p>;
  }

  if (gptSearchError) {
    return null;
  }

  if (!gptMovies?.length) {
    return (
      <p className="text-gray-400 mt-6">
        No results yet. Try searching for a movie.
      </p>
    );
  }

  return (
    <div className="w-full mt-6">
      <MovieList
        title="GPT Recommendations"
        movies={gptMovies}
        onMovieClick={onMovieClick}
      />
    </div>
  );
};

export default GPTMovieSuggestions;
