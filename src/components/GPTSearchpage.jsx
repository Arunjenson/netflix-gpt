import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = ({ onMovieClick }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white w-full px-4 sm:px-6 pt-20 sm:pt-24">
      <GPTSearchBar />
      <div className="w-full max-w-6xl">
        <GPTMovieSuggestions onMovieClick={onMovieClick} />
      </div>
    </div>
  );
};

export default GPTSearch;
