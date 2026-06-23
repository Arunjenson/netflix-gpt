const VideoTitle = ({ title, overview, movieId, onMoreInfo }) => {
  return (
    <div className="flex flex-col justify-center h-full px-4 sm:px-10 md:px-16 max-w-2xl">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-4 sm:mb-8 line-clamp-2 sm:line-clamp-3 drop-shadow-md max-w-md">
        {overview}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button className="bg-white text-black font-bold px-4 py-2 sm:px-8 sm:py-3 rounded hover:bg-opacity-80 transition flex items-center justify-center gap-2 text-sm sm:text-base">
          ▶️ Play
        </button>
        <button
          onClick={() => onMoreInfo?.(movieId)}
          className="bg-gray-600 bg-opacity-50 text-white font-bold px-4 py-2 sm:px-8 sm:py-3 rounded hover:bg-opacity-70 transition text-sm sm:text-base"
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
