const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  studentRegistration,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  submitMedicalForm,
  getLoggedInStudent,
  submitLeave,
} = require("../controllers/studentController");

const verifyToken = require("../middleware/authMiddleware");

// ------------------- Multer Setup -------------------
// Single declaration of upload
const upload = multer({ dest: "uploads/" });

// ---------------- Student Registration & CRUD ----------------
router.post("/register", studentRegistration);          // Register a new student
router.get("/all", getAllStudents);                    // Get all students
router.put("/:id", updateStudent);                     // Update student by ID
router.delete("/:id", deleteStudent);                 // Delete student by ID

// ---------------- Logged-in Student ----------------
router.get("/me", verifyToken, getLoggedInStudent);   // Must come before /:id to avoid "Cast to ObjectId failed"

// ---------------- Single Student by ID ----------------
router.get("/:id", getStudentById);                   // Get student by ID

// ---------------- Medical Form Submission ----------------
router.post(
  "/medicalform",
  verifyToken,
  upload.single("medicalSlip"),   // Use the single upload instance
  submitMedicalForm
);

// ---------------- Leave Form Submission ----------------
router.post(
  "/leave",
  verifyToken,
  upload.single("proofDoc"),      // Use the same upload instance
  submitLeave
);

module.exports = router;
