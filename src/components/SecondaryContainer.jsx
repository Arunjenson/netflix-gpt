import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = ({ onMovieClick }) => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  return (
    <div className="bg-black">
      <div className="-mt-20 sm:-mt-32 md:-mt-54 relative z-20">
        <MovieList
          title="Now Playing"
          movies={movies}
          onMovieClick={onMovieClick}
        />
        <MovieList
          title="Popular"
          movies={popularMovies}
          onMovieClick={onMovieClick}
        />
        <MovieList
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={onMovieClick}
        />
        <MovieList
          title="Now Playing"
          movies={movies}
          onMovieClick={onMovieClick}
        />
        <MovieList
          title="Now Playing"
          movies={movies}
          onMovieClick={onMovieClick}
        />
        <MovieList
          title="Now Playing"
          movies={movies}
          onMovieClick={onMovieClick}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
