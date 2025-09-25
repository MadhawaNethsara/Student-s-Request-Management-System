const Timetable = require("../models/timetable.js");

// Add single timetable entry
const addTimetableEntry = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res.status(201).json({
      message: "Timetable entry added successfully",
      timetable,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk upload timetable entries
const bulkUploadTimetable = async (req, res) => {
  try {
    await Timetable.insertMany(req.body); // expects an array of entries
    res.status(201).json({ message: "Bulk timetable entries added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all timetable entries
const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all timetable entries
const deleteAllTimetables = async (req, res) => {
  try {
    await Timetable.deleteMany();
    res.json({ message: "All timetable entries deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTimetableEntry,
  bulkUploadTimetable,
  getAllTimetables,
  deleteAllTimetables,
};
