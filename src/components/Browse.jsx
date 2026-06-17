import Header from "./Header";
import { useNowPlayingMovies } from "../hooks";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <>
      <Header />
      <div>Browse</div>
    </>
  );
};

export default Browse;
