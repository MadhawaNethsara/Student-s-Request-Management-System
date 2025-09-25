const express = require("express");
const Timetable = require("../models/timetable.js");
const {
  addTimetableEntry,
  bulkUploadTimetable,
  getAllTimetables,
  deleteAllTimetables,
} = require("../controllers/timetableController");

const router = express.Router();

// Routes
router.post("/add", addTimetableEntry);
router.post("/bulk", bulkUploadTimetable);
router.get("/", getAllTimetables);
router.delete("/", deleteAllTimetables);

module.exports = router;
