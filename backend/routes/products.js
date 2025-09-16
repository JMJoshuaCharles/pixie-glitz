const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticateToken = require("../middleware/auth");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new product (admin only)
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  try {
    const { name, description, price, stock } = req.body;
    const result = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, stock]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const result = await pool.query(
      "UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *",
      [name, description, price, stock, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
