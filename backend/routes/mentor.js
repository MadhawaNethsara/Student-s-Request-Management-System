const express = require("express");

const router = express.Router();



const { mentorRegistration } = require("../controllers/mentorController");


router.post('/mentor-registration', mentorRegistration);


module.exports = router;