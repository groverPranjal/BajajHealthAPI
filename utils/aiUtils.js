const axios = require("axios");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function getGeminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, {
    contents: [{ parts: [{ text: prompt }] }],
  });

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Empty response from AI");
  }

  return text.trim();
}

module.exports = { getGeminiResponse };
