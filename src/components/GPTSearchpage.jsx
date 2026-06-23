import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white w-full px-4 pt-24">
      <GPTSearchBar />
      <div className="w-full max-w-6xl">
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
