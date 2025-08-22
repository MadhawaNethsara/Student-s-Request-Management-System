const express = require("express");
const { doctorRegistration } = require("../controllers/doctorController");


const router = express.Router();



//const { doctorRegistration } = require("../controllers/doctorController");


router.post('/doctor-registration', doctorRegistration);


module.exports = router;