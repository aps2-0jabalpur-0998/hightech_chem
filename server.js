import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'HighTech Periodic Table AI backend running' });
});

app.post('/chat', async (req, res) => {
  try {
    const { message, element } = req.body;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY on server' });
    }
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const systemPrompt =
      "You are an AI chemistry tutor for a class 11 science student in India. " +
      "Explain concepts in simple, clear language with intuition and exam-focused points. " +
      "Whenever an element name or symbol is provided, relate your explanation to periodic trends, " +
      "electronic configuration, valence electrons, bonding behavior, and real-life applications.";

    const userPrompt = element
      ? `Element context: ${element}. Student message: ${message}`
      : message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: 'OpenAI error', detail: errText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim()
      || 'Sorry, I could not generate a response.';

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
