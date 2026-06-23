import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODEL } from "./constants";

function parseMovieTitles(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((s) => String(s).trim()).filter(Boolean).slice(0, 5);
    }
  } catch {
    // fall through to newline parsing
  }
  return raw
    .split(/\r?\n/)
    .map((s) => s.replace(/^\d+[\).\-\s]*/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
}

const MAX_ATTEMPTS_PER_MODEL = 3;

function parseGeminiError(err) {
  const raw = err?.message || String(err);
  try {
    const parsed = JSON.parse(raw);
    return parsed?.error?.message || raw;
  } catch {
    return raw;
  }
}

function getRetryDelayMs(err, attempt) {
  const msg = parseGeminiError(err);
  const match = msg.match(/retry in ([\d.]+)s/i);
  if (match) return Math.ceil(parseFloat(match[1]) * 1000) + 500;
  return Math.min(1000 * 2 ** attempt, 8000);
}

function isRetryableError(err) {
  return err?.status === 429 || err?.status === 503;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildFreeTierModels(preferredModel) {
  return [
    preferredModel,
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3-flash-preview",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
  ].filter((model, index, list) => list.indexOf(model) === index);
}

async function callGeminiStructured(ai, model, query, temperature) {
  const response = await ai.models.generateContent({
    model,
    contents: `Suggest movies similar to: ${query}`,
    config: {
      systemInstruction:
        "You are a movie recommendation assistant. Return exactly 5 movie titles similar to the input. Output only a JSON array of 5 strings. No numbering, explanations, or extra text.",
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: { type: "string" },
        minItems: 5,
        maxItems: 5,
      },
      temperature,
    },
  });
  return parseMovieTitles(response.text);
}

async function callGeminiPlain(ai, model, query, temperature) {
  const response = await ai.models.generateContent({
    model,
    contents: `Suggest exactly 5 movies similar to "${query}". Reply with only a JSON array of 5 movie title strings.`,
    config: { temperature },
  });
  return parseMovieTitles(response.text);
}

export function getGeminiErrorMessage(err) {
  const details = parseGeminiError(err);
  if (details.includes("API key not valid")) {
    return "Invalid Gemini API key. Check VITE_GEMINI_API_KEY in .env (get one at https://aistudio.google.com/apikey)";
  }
  if (details.includes("Quota exceeded") || details.includes("RESOURCE_EXHAUSTED")) {
    return "Gemini free-tier quota exceeded. Wait a minute and try again, or check usage at https://ai.dev/rate-limit";
  }
  if (details.includes("high demand")) {
    return "Gemini is temporarily overloaded. Please wait a few seconds and try again.";
  }
  return details || "Gemini request failed";
}

export async function generateMovieTitles(query, temperature = 0.2) {
  if (!GEMINI_API_KEY) {
    throw new Error("Set VITE_GEMINI_API_KEY in .env before building");
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const preferredModel = GEMINI_MODEL || "gemini-3.1-flash-lite";
  const freeTierModels = buildFreeTierModels(preferredModel);
  let lastError;

  for (const model of freeTierModels) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await callGeminiStructured(ai, model, query, temperature);
      } catch (err) {
        lastError = err;
        if (isRetryableError(err) && attempt < MAX_ATTEMPTS_PER_MODEL - 1) {
          const delay = getRetryDelayMs(err, attempt);
          console.warn(`${model} attempt ${attempt + 1} failed (${err.status}), retrying in ${delay}ms...`);
          await sleep(delay);
          continue;
        }
        break;
      }
    }

    try {
      console.warn(`Structured output failed on ${model}, trying plain prompt...`);
      return await callGeminiPlain(ai, model, query, temperature);
    } catch (err) {
      lastError = err;
      console.warn(`Model ${model} unavailable, trying next model...`);
    }
  }

  throw lastError;
}
