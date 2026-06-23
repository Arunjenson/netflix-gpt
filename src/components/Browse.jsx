import { useState } from "react";
import Header from "./Header";
import { useNowPlayingMovies, usePopularMovies } from "../hooks";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import GPTSearch from "./GPTSearchpage";
import MovieDetailModal from "./MovieDetailModal";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  const { isGptEnabled } = useSelector((state) => state.gpt);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovieClick = (movieId) => setSelectedMovieId(movieId);
  const handleCloseModal = () => setSelectedMovieId(null);

  return (
    <>
      <Header />
      {isGptEnabled ? (
        <GPTSearch onMovieClick={handleMovieClick} />
      ) : (
        <>
          <MainContainer onMovieClick={handleMovieClick} />
          <SecondaryContainer onMovieClick={handleMovieClick} />
        </>
      )}
      {selectedMovieId && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Browse;
