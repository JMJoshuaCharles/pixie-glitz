const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../db");

// Signup (no hashing)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user (plain text password)
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, password, role || "customer"]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (no hashing)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = userQuery.rows[0];

    // Compare plain text password
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
