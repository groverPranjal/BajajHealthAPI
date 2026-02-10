const axios = require("axios");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

async function getGeminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  try {
    console.log("Calling Gemini API with prompt:", prompt.substring(0, 50));
    const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, {
      contents: [{ parts: [{ text: prompt }] }],
    }, { timeout: 30000 });
    
    console.log("Gemini API response status:", response.status);
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from AI");
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error.response?.status, error.response?.data?.error?.message || error.message);
    if (error.response?.status === 400 || error.response?.status === 404) {
      throw new Error(`AI API Error (${error.response?.status}): ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
}

module.exports = { getGeminiResponse };
