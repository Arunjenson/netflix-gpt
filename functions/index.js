import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import {
  generateMovieTitles,
  getGeminiErrorResponse,
} from './geminiService.js';

const geminiApiKey = defineSecret('GEMINI_API_KEY');
const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

export const gemini = onRequest(
  { secrets: [geminiApiKey], cors: false },
  async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = geminiApiKey.value();
    if (!apiKey) {
      return res.status(500).json({ error: 'Server missing GEMINI_API_KEY environment variable' });
    }

    const { query, temperature = 0.2 } = req.body || {};

    if (!query) {
      return res.status(400).json({ error: 'Missing `query` in request body' });
    }

    try {
      const movies = await generateMovieTitles(query, temperature, apiKey, preferredModel);
      if (!movies.length) {
        return res.status(500).json({ error: 'Gemini returned no movie titles' });
      }
      return res.status(200).json({ movies });
    } catch (err) {
      console.error('Proxy error:', err);
      const { status, body } = getGeminiErrorResponse(err);
      return res.status(status).json(body);
    }
  },
);
