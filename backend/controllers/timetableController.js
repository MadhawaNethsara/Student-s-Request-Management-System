// routes/timetableRoutes.js
import express from "express";
import Timetable from "../models/timetable.js";

const router = express.Router();

// Add single entry
router.post("/add", async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res.json({ message: "Timetable entry added", timetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk upload (Excel) — later you’ll parse Excel and insertMany
router.post("/bulk", async (req, res) => {
  try {
    await Timetable.insertMany(req.body); // req.body = array of entries
    res.json({ message: "Bulk entries added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all entries
router.get("/", async (req, res) => {
  const tables = await Timetable.find();
  res.json(tables);
});

// Delete all entries
router.delete("/", async (req, res) => {
  await Timetable.deleteMany();
  res.json({ message: "All timetable entries deleted" });
});

export default router;
