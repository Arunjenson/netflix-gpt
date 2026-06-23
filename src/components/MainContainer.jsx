import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = ({ onMovieClick }) => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return null;
  const mainMovie = movies ? movies[0] : null;
  const { title, overview, id } = mainMovie;
  return (
    <div className="relative w-full aspect-video min-h-[50vh] sm:min-h-0 overflow-hidden bg-black z-0">
      <div className="absolute inset-0">
        <VideoBackground id={id} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent opacity-80"></div>

      <div className="absolute inset-0">
        <VideoTitle
          title={title}
          overview={overview}
          movieId={id}
          onMoreInfo={onMovieClick}
        />
      </div>
    </div>
  );
};

export default MainContainer;
