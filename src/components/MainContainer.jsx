import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return null;
  const mainMovie = movies ? movies[0] : null;
  const { title, overview, backdrop_path, id } = mainMovie;
  return (
    <div className="pt-32 px-10">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
