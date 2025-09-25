const express = require("express");
const {
  studentRegistration,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  submitMedicalForm,
  getLoggedInStudent,
} = require("../controllers/studentController");
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

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
  upload.single("medicalSlip"),
  submitMedicalForm
);

module.exports = router;
