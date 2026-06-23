import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, onClick }) => {
  const handleClick = () => onClick?.(movie.id);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(movie.id);
    }
  };

  return (
    <div
      className="w-28 sm:w-36 md:w-44 lg:w-48 shrink-0 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
    >
      <img
        src={IMG_CDN_URL + movie.poster_path}
        alt={movie.title}
        className="w-full h-full object-cover"
        width="300"
        height="450"
      />
    </div>
  );
};

export default MovieCard;
