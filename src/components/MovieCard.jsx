import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 shrink-0 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={IMG_CDN_URL + movie.poster_path}
        alt={movie.title}
        className="w-full h-full object-cover"
        width="300"
        height="450"
      />
      {/* <h2>{movie.title}</h2>
      <p>{movie.overview}</p> */}
    </div>
  );
};

export default MovieCard;
