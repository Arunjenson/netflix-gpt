import Header from "./Header";
import { useNowPlayingMovies, usePopularMovies } from "../hooks";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import GPTSearch from "./GPTSearchpage";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  const { isGptEnabled } = useSelector((state) => state.gpt);
  return (
    <>
      <Header />
      {isGptEnabled ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </>
  );
};

export default Browse;
