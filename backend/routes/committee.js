const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  committeeRegistration,
  getAllMedicalForms,
  reviewMedicalForm,
} = require("../controllers/committeeController");

// Register committee member
router.post("/committee-registration", committeeRegistration);

// Get all medical forms
router.get("/forms", verifyToken, getAllMedicalForms);

// Approve/Reject form
router.put("/forms/:id/review", verifyToken, reviewMedicalForm);

module.exports = router;
