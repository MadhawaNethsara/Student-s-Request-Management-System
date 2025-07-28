const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const controller = require('../controllers/committeeController');

router.get('/all-applications', verifyToken, controller.getAllApplications);
router.post('/final-decision/:id', verifyToken, controller.finalDecision);

module.exports = router;