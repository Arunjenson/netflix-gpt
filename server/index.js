import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { generateMovieTitles, getGeminiErrorResponse } from '../functions/geminiService.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const preferredModel = process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite';

if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Set GEMINI_API_KEY in your environment before starting the server.');
}

app.post('/api/gemini', async (req, res) => {
  const { query, temperature = 0.2 } = req.body || {};

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server missing GEMINI_API_KEY environment variable' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing `query` in request body' });
  }

  try {
    const movies = await generateMovieTitles(query, temperature, GEMINI_API_KEY, preferredModel);
    if (!movies.length) {
      return res.status(500).json({ error: 'Gemini returned no movie titles' });
    }
    return res.status(200).json({ movies });
  } catch (err) {
    console.error('Proxy error:', err);
    const { status, body } = getGeminiErrorResponse(err);
    return res.status(status).json(body);
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy listening on http://localhost:${port}`);
});
