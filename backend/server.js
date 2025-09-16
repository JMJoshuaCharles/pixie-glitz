const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());



// Routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
