
const express = require('express');
const router = express.Router();
const { getApplicationsbyId,submitApplication } = require('../controllers/appController');
const requireAuth=require('../middleware/authMiddleware');

router.get("/:jobId", requireAuth, getApplicationsbyId);
router.post("/submit",submitApplication);


module.exports = router;
