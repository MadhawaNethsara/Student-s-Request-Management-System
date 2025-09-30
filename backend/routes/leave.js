// routes/leaveRoutes.js
const express = require("express");
const router = express.Router();
const LeaveForm = require("../models/LeaveForm");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Setup file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST /api/student/leave
router.post("/", authMiddleware, upload.single("proofDoc"), async (req, res) => {
  try {
    const studentId = req.user._id;
    const leaveData = {
      student: studentId,
      fullName: req.body.fullName,
      regNumber: req.body.regNumber,
      year: req.body.year,
      level: req.body.level,
      semester: req.body.semester,
      degree: req.body.degree,
      contact: req.body.contact,
      reason: req.body.reason,
      details: req.body.details,
      proofDoc: req.file ? req.file.path : null,
    };

    const leaveForm = await LeaveForm.create(leaveData);
    res.status(201).json({ success: true, leaveForm });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
