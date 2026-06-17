const VideoTitle = ({ title, overview }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg max-w-md mt-4">{overview}</p>
      <div className="flex space-x-4 mt-6">
        <button className="bg-gray-200 text-black font-medium px-4 py-2 rounded mr-2 w-32">
          ▶️ &nbsp;Play
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded w-32">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
