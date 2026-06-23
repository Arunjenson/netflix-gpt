import { useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useMovieDetails } from "../hooks/useMovieDetails";

const MovieDetailModal = ({ movieId, onClose }) => {
  const { details, cast, director, trailer, loading, error } =
    useMovieDetails(movieId);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!movieId) return null;

  const year = details?.release_date?.slice(0, 4);
  const genres = details?.genres?.map((g) => g.name).join(", ");
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/80 overflow-y-auto py-4 sm:py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Movie details"
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-zinc-900 rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white text-xl hover:bg-black transition"
          aria-label="Close"
        >
          ×
        </button>

        {loading && (
          <div className="flex items-center justify-center min-h-[300px] text-gray-300">
            Loading movie details...
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[300px] text-red-400 px-6 text-center">
            {error}
          </div>
        )}

        {!loading && !error && details && (
          <>
            <div className="relative h-48 sm:h-64 md:h-80">
              {details.backdrop_path ? (
                <img
                  src={IMG_CDN_URL + details.backdrop_path}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {details.title}
                </h2>
                {details.tagline && (
                  <p className="text-gray-300 italic mt-1 text-sm sm:text-base">
                    {details.tagline}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap gap-2 sm:gap-3 text-sm text-gray-300">
                {year && <span>{year}</span>}
                {runtime && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>{runtime}</span>
                  </>
                )}
                {details.vote_average > 0 && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>⭐ {details.vote_average.toFixed(1)}</span>
                  </>
                )}
                {details.status && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span>{details.status}</span>
                  </>
                )}
              </div>

              {genres && (
                <p className="text-purple-400 text-sm">{genres}</p>
              )}

              {director && (
                <p className="text-gray-300 text-sm">
                  <span className="text-gray-400">Director: </span>
                  {director.name}
                </p>
              )}

              {details.overview && (
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                  {details.overview}
                </p>
              )}

              {trailer?.key && (
                <div className="aspect-video w-full rounded overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                    title={`${details.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {cast.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Cast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {cast.map((person) => (
                      <div key={person.id} className="text-center">
                        {person.profile_path ? (
                          <img
                            src={IMG_CDN_URL + person.profile_path}
                            alt={person.name}
                            className="w-full aspect-[2/3] object-cover rounded"
                          />
                        ) : (
                          <div className="w-full aspect-[2/3] bg-zinc-700 rounded flex items-center justify-center text-gray-400 text-xs">
                            No photo
                          </div>
                        )}
                        <p className="text-white text-xs sm:text-sm mt-1 truncate">
                          {person.name}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {person.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;
