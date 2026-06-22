import { useRef } from "react";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const searchInputRef = useRef(null);
  const handleGPTSearchClick = async () => {
    // Implement the logic to handle the GPT search click event

    console.log("GPT Search button clicked", searchInputRef.current.value);
    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Suggest movies similar to: ${searchInputRef.current.value}`,
        },
      ],
    });
    console.log("GPT Results:", gptResults.choices[0].message.content);
  };
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form
        className="w-full max-w-2xl mx-auto mt-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="What movie are you looking for?"
            className="w-full basis-4/5 p-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            onClick={handleGPTSearchClick}
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
