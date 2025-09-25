// routes/medicalForm.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const MedicalForm = require("../models/MedicalForm");

router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const form = new MedicalForm({
      ...req.body,
      student: req.user._id, // automatically assign logged-in student
    });
    await form.save();
    res.status(201).json({ message: "Medical form submitted", form });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form" });
  }
});

module.exports = router;
