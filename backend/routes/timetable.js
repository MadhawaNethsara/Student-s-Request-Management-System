const express = require("express");
const router = express.Router();
const {
  addTimetableEntry,
  bulkUploadTimetable,
  getAllTimetables,
  deleteAllTimetables,
} = require("../controllers/timetableController");

// Add single timetable entry
router.post("/add-entry", addTimetableEntry);

// Bulk upload timetable (Excel/JSON array)
router.post("/bulk-upload", bulkUploadTimetable);

// Get all timetable entries
router.get("/all", getAllTimetables);

// Delete all timetable entries
router.delete("/delete-all", deleteAllTimetables);

module.exports = router;
