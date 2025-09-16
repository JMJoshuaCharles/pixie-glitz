const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

// Place new order
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { total_amount } = req.body;
    const result = await pool.query(
      "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *",
      [req.user.id, total_amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user orders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (admin only)
router.get("/all", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
