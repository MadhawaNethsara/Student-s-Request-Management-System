const express = require("express");
const { mentorRegistration, getAllMedicalForms, reviewMedicalForm } = require("../controllers/mentorController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get all medical forms
router.get("/forms", verifyToken, getAllMedicalForms);

// Approve/Reject medical form
router.put("/forms/:id/review", verifyToken, reviewMedicalForm);

// Mentor Registration
router.post("/mentor-registration", mentorRegistration);

module.exports = router;
