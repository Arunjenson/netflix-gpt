import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return null;
  const mainMovie = movies ? movies[0] : null;
  const { title, overview, backdrop_path, id } = mainMovie;
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black z-0">
      {/* Video Background */}
      <div className="absolute inset-0">
        <VideoBackground id={id} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent opacity-80"></div>

      {/* Video Title and Content */}
      <div className="absolute inset-0">
        <VideoTitle title={title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
