
const express = require('express');
const router = express.Router();
const { getApplicationsbyId } = require('../controllers/appController');
const requireAuth=require('../middleware/authMiddleware');

router.get("/job/:jobId", requireAuth, getApplicationsbyId);


module.exports = router;
