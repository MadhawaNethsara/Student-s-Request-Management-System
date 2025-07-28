const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { doctorRegistration } = require("../controllers/doctorController");

router.post('/doctor-registration', doctorRegistration);
module.exports = router;