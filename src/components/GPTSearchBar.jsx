import { useRef } from "react";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const searchInputRef = useRef(null);
  const handleGPTSearchClick = async () => {
    // Implement the logic to handle the GPT search click event

    console.log("GPT Search button clicked", searchInputRef.current.value);
    const gptResults = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a movie recommendation assistant. When given a movie title or short description, return exactly 5 movie titles similar to that input. Output only the titles — either as a JSON array of strings or as five newline-separated titles. Do not include explanations, numbering, or any extra text.",
        },
        {
          role: "user",
          content: `Suggest movies similar to: ${searchInputRef.current.value}`,
        },
        {
          role: "assistant",
          content: `["Inception", "Shutter Island", "The Prestige", "Memento", "Interstellar"]`,
        },
        {
          role: "user",
          content: `Suggest movies similar to: The Matrix`,
        },
        {
          role: "assistant",
          content: `["Blade Runner", "Dark City", "Equilibrium", "Inception", "Total Recall"]`,
        },
      ],
    });
    const raw = gptResults.choices[0].message.content;
    let movieList;
    try {
      movieList = JSON.parse(raw);
      if (!Array.isArray(movieList)) throw new Error("not array");
    } catch (e) {
      movieList = raw
        .split(/\r?\n/)
        .map((s) => s.replace(/^\d+[\).\-\s]*/, "").trim())
        .filter(Boolean)
        .slice(0, 5);
    }
    console.log("GPT Results:", movieList);
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
