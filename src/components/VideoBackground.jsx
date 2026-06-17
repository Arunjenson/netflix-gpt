import { useSelector } from "react-redux";
import { useMainTrailer } from "../hooks/useMainTrailer";

const VideoBackground = ({ id }) => {
  const bgVideo = useSelector((store) => store.movies.mainTrailerVideo);

  useMainTrailer({ movieId: id });
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${bgVideo?.key}?autoplay=1&mute=1&loop=1&controls=0&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
