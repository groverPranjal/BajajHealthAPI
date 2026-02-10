const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const { healthCheck } = require("./controllers/healthController");
const { handleBfhl } = require("./controllers/bfhlController");

app.get("/health", healthCheck);
app.post("/bfhl", handleBfhl);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
