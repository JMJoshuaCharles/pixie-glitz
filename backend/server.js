const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Pixi Glitz backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
