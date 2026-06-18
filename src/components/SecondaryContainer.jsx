import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  return (
    <div className="bg-black">
      <div className="-mt-54 relative z-20">
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Popular" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
