const mathUtils = require("../utils/mathUtils");
const aiUtils = require("../utils/aiUtils");

const EMAIL = process.env.OFFICIAL_EMAIL || "pranjal1097.be23@chitkara.edu.in";

async function handleBfhl(req, res) {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Object.keys(body).length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Request must contain exactly one key",
      });
    }

    const key = Object.keys(body)[0];
    const value = body[key];

    let result;

    switch (key) {
      case "fibonacci":
        if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Fibonacci input must be a non-negative integer",
          });
        }
        result = mathUtils.generateFibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Prime input must be a non-empty array",
          });
        }
        result = value.filter((num) => typeof num === "number" && mathUtils.isPrime(num));
        break;

      case "lcm":
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "LCM input must be a non-empty array",
          });
        }
        result = mathUtils.calculateLCM(value);
        break;

      case "hcf":
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "HCF input must be a non-empty array",
          });
        }
        result = mathUtils.calculateHCF(value);
        break;

      case "AI":
        if (typeof value !== "string" || value.trim() === "") {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "AI input must be a non-empty string",
          });
        }
        const aiResponse = await aiUtils.getGeminiResponse(value);
        result = aiResponse.split(" ")[0] || "";
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: EMAIL,
          error: "Invalid key provided",
        });
    }

    return res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result,
    });
  } catch (error) {
    console.error("BFHL Error:", error.message);
    return res.status(500).json({
      is_success: false,
      official_email: EMAIL,
      error: error.message,
    });
  }
}

module.exports = { handleBfhl };
