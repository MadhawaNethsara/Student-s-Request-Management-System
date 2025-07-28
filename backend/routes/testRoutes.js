
const express = require('express');
const pool = require('../config/db'); // 👈 import your DB pool
const router = express.Router();

router.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as now');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

