const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Serve the Frontend Files ---
// This tells the server where to find your html, css, and script files
app.use(express.static(path.join(__dirname, '')));

// --- THIS IS THE NEW FIX ---
// This explicitly tells the server to send index.html when someone visits the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// --- END OF THE FIX ---


// --- API Route (This is your existing code) ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

app.post('/ask-gemini', async (req, res) => {
  const userQuestion = req.body.question;
  if (!userQuestion) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  try {
    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userQuestion }] }] })
      }
    );
    const geminiData = await geminiResp.json();
    const aiAnswer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
    res.json({ answer: aiAnswer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});