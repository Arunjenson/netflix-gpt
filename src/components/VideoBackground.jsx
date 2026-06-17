import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMainTrailer } from "../utils/movieSlice";

const VideoBackground = ({ id }) => {
  const dispatch = useDispatch();
  const bgVideoId = useSelector((store) => store.movies.mainTrailerVideo);
  const getVideoBackground = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?npmpage=1`,
        API_OPTIONS,
      );
      const data = await response.json();
      const trailers = data.results.filter(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube" &&
          video.official === true,
      );
      console.log("Video Background Data:", trailers);
      const bgVideo = trailers.length > 0 ? trailers[0] : data.results[0];
      console.log("Video Background:", trailers.length > 0);
      console.log("Video Background:", bgVideo.key);
      dispatch(addMainTrailer(bgVideo));
    } catch (error) {
      console.error("Error fetching video background:", error);
    }
  };
  useEffect(() => {
    getVideoBackground();
  }, []);
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${bgVideoId?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
