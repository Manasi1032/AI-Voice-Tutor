const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

app.post('/ask-gemini', async (req, res) => {
  const userQuestion = req.body.question;
  if (!userQuestion) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  console.log("Received question:", userQuestion); // New log

  try {
    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuestion }] }]
        })
      }
    );
    const geminiData = await geminiResp.json();

    // --- THIS IS THE IMPORTANT NEW PART ---
    console.log("--- Full Response from Gemini API ---");
    console.log(JSON.stringify(geminiData, null, 2)); // Log the entire response
    console.log("-------------------------------------");
    // ------------------------------------

    const aiAnswer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
    res.json({ answer: aiAnswer });

  } catch (e) {
    console.error("!!! CRITICAL ERROR !!!", e); // Improved error log
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});