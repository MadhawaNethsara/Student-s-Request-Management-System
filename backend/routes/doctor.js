const express = require("express");
const { doctorRegistration } = require("../controllers/doctorController");
const { getAllMedicalFormsDoctor, reviewMedicalFormDoctor } = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET all forms for doctors
router.get("/forms", verifyToken, getAllMedicalFormsDoctor);

// PUT review (approve/reject)
router.put("/forms/:id/review", verifyToken, reviewMedicalFormDoctor);


//const { doctorRegistration } = require("../controllers/doctorController");


router.post('/doctor-registration', doctorRegistration);


module.exports = router;