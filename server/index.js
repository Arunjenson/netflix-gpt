import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as genai from '@google/genai';

const app = express();
const port = process.env.PORT || 5174;

app.use(express.json());
// Enable CORS for development. Adjust origin in production.
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "Ab8RN6JhZ4dIvONDcT2PBa6HSwXCbbizPM3nrQRuVnFwuAfugg";
if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Set GEMINI_API_KEY in your environment before starting the server.');
}

// Prefer `GoogleGenAI` or `Client` export depending on installed SDK version
const GenAIClass = genai.GoogleGenAI || genai.Client || genai.default || genai;
const genaiClient = new GenAIClass({ apiKey: GEMINI_API_KEY });

app.post('/api/gemini', async (req, res) => {
  const { query, model, temperature = 0.2, candidate_count = 1 } = req.body || {};
  const GEMINI_MODEL = model || process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash';

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server missing GEMINI_API_KEY environment variable' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing `query` in request body' });
  }

  try {
    const interaction = await genaiClient.interactions.create({
      model: GEMINI_MODEL,
      input: [
        { type: 'text', text: 'You are a movie recommendation assistant. When given a movie title or short description, return exactly 5 movie titles similar to that input. Output only the titles — either as a JSON array of strings or as five newline-separated titles. Do not include explanations, numbering, or any extra text.' },
        { type: 'text', text: `Suggest movies similar to: ${query}` },
      ],
      generation_config: { temperature, candidate_count },
    });

    // interaction.output_text is a convenience property returning joined text
    const outputText = interaction.output_text ||
      (interaction.steps || [])
        .filter((s) => s.type === 'model_output')
        .map((s) => s.content?.map((c) => c.text || '').join('') || '')
        .join('\n');

    return res.status(200).json({ output_text: outputText, raw: interaction });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Proxy request failed', details: err?.message || String(err) });
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy listening on http://localhost:${port}`);
});
