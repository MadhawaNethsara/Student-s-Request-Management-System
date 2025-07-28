const express = require("express");

const router = express.Router();

//const verifyToken = require('../middleware/auth');
const { studentRegistration } = require("../controllers/studentController");
//const controller = require('../controllers/studentController');

// router.post('/submit-application', verifyToken, submitApplication);

router.post('/student-registration', studentRegistration);
// router.get('/my-applications', verifyToken, controller.getMyApplications);
module.exports = router;
