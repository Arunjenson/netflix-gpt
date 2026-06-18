const VideoTitle = ({ title, overview }) => {
  return (
    <div className="flex flex-col justify-center h-full px-10 md:px-16 max-w-2xl">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-base md:text-lg text-gray-100 mb-8 line-clamp-3 drop-shadow-md max-w-md">
        {overview}
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-opacity-80 transition flex items-center gap-2">
          ▶️ Play
        </button>
        <button className="bg-gray-600 bg-opacity-50 text-white font-bold px-8 py-3 rounded hover:bg-opacity-50 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
