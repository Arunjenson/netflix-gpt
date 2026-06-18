import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-2 bg-transparent">
      <div className="flex overflow-x-auto scrollbar-hide py-4">
        <h1 className="text-3xl py-6 text-white">{title}</h1>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
