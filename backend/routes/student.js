const express = require("express");
const router = express.Router();
const { studentRegistration, getAllStudents } = require("../controllers/studentController");

// router.post('/submit-application', verifyToken, submitApplication);
router.post('/student-registration', studentRegistration);
router.get('/students', getAllStudents);

module.exports = router;
