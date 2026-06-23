import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Set GEMINI_API_KEY in your environment before starting the server.');
}

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

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
    .map((s) => s.replace(/^\d+[\).\-\s]*/, '').trim())
    .filter(Boolean)
    .slice(0, 5);
}

const preferredModel = process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite';
// Models with free-tier access, ordered by reliability when 2.5-flash is overloaded
const FREE_TIER_MODELS = [
  preferredModel,
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
].filter((model, index, list) => list.indexOf(model) === index);

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

async function callGeminiStructured(model, query, temperature) {
  const response = await ai.models.generateContent({
    model,
    contents: `Suggest movies similar to: ${query}`,
    config: {
      systemInstruction:
        'You are a movie recommendation assistant. Return exactly 5 movie titles similar to the input. Output only a JSON array of 5 strings. No numbering, explanations, or extra text.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'array',
        items: { type: 'string' },
        minItems: 5,
        maxItems: 5,
      },
      temperature,
    },
  });
  return parseMovieTitles(response.text);
}

async function callGeminiPlain(model, query, temperature) {
  const response = await ai.models.generateContent({
    model,
    contents: `Suggest exactly 5 movies similar to "${query}". Reply with only a JSON array of 5 movie title strings.`,
    config: { temperature },
  });
  return parseMovieTitles(response.text);
}

async function generateMovieTitles(query, temperature) {
  let lastError;

  for (const model of FREE_TIER_MODELS) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await callGeminiStructured(model, query, temperature);
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
      return await callGeminiPlain(model, query, temperature);
    } catch (err) {
      lastError = err;
      console.warn(`Model ${model} unavailable, trying next model...`);
    }
  }

  throw lastError;
}

app.post('/api/gemini', async (req, res) => {
  const { query, temperature = 0.2 } = req.body || {};

  if (!GEMINI_API_KEY || !ai) {
    return res.status(500).json({ error: 'Server missing GEMINI_API_KEY environment variable' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing `query` in request body' });
  }

  try {
    const movies = await generateMovieTitles(query, temperature);
    if (!movies.length) {
      return res.status(500).json({ error: 'Gemini returned no movie titles' });
    }
    return res.status(200).json({ movies });
  } catch (err) {
    console.error('Proxy error:', err);
    const details = parseGeminiError(err);
    if (details.includes('API key not valid')) {
      return res.status(500).json({
        error: 'Invalid Gemini API key. Check GEMINI_API_KEY in .env (get one at https://aistudio.google.com/apikey)',
        details,
      });
    }
    if (details.includes('Quota exceeded') || details.includes('RESOURCE_EXHAUSTED')) {
      return res.status(429).json({
        error: 'Gemini free-tier quota exceeded. Wait a minute and try again, or check usage at https://ai.dev/rate-limit',
        details,
      });
    }
    if (details.includes('high demand')) {
      return res.status(503).json({
        error: 'Gemini is temporarily overloaded. Please wait a few seconds and try again.',
        details,
      });
    }
    return res.status(500).json({ error: 'Proxy request failed', details });
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy listening on http://localhost:${port}`);
});
