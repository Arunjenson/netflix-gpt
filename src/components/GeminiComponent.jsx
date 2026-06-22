import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODEL } from "../utils/constants";

// WARNING: Using the SDK in the browser exposes your API key to end users.
// Use this only for local prototyping. For production, call Gemini from a server.
const apiKey = GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export default function GeminiComponent() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const model = GEMINI_MODEL || "gemini-2.5-flash";
      // NOTE: method shape depends on SDK version — this follows your example.
      const res = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      // Normalize common response shapes
      const text =
        res?.text ||
        res?.output_text ||
        (typeof res === "string" ? res : JSON.stringify(res));
      setResponse(text);
    } catch (error) {
      console.error("Error fetching Gemini:", error);
      setResponse("Failed to generate content. See console for details.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h3>Gemini SDK Prototyping</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Gemini something..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={generateText} disabled={loading}>
        {loading ? "Thinking..." : "Submit"}
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
