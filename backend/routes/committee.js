const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {committeeRegistration} = require('../controllers/committeeController');

router.post('/committee-registration', committeeRegistration);

module.exports = router;