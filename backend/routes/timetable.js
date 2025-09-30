const express = require("express");
const router = express.Router();
const Timetable = require("../models/timetable");
const verifyToken = require("../middleware/authMiddleware");

// GET subjects by date + student filters
router.get("/", verifyToken, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    const student = req.user; // from token
    const subjects = await Timetable.find({
      date: new Date(date),
      degree: student.degree,
      level: student.level,
      semester: student.semester,
    });

    res.json({ success: true, subjects });
  } catch (err) {
    console.error("Error fetching timetable:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
