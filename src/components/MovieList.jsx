import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, onMovieClick }) => {
  return (
    <div className="px-2 sm:px-4 py-2 bg-transparent">
      <h1 className="text-xl sm:text-2xl md:text-3xl py-2 sm:py-4 text-white">
        {title}
      </h1>
      <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide py-2 sm:py-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
