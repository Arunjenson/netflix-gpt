const GPTSearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form className="w-full max-w-2xl mx-auto mt-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="What movie are you looking for?"
            className="w-full basis-4/5 p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full basis-1/4 bg-purple-600 cursor-pointer h-14 text-white py-3 rounded font-semibold hover:bg-purple-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default GPTSearchBar;
