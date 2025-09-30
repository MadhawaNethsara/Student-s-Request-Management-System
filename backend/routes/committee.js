const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllMedicalForms,
  reviewMedicalForm,
  getLeaveForms,
  reviewLeaveForm,
} = require("../controllers/committeeController");

// ---------------- Medical Forms ----------------
router.get("/forms", authMiddleware, getAllMedicalForms);                  // Get all medical forms
router.put("/forms/:id/review", authMiddleware, reviewMedicalForm);     // Approve/Reject medical form

// ---------------- Leave Forms ----------------
router.get("/leaveforms", authMiddleware, getLeaveForms);               // Get all leave forms
router.put("/leaveforms/:id/review", authMiddleware, reviewLeaveForm);  // Approve/Reject leave form

module.exports = router;
