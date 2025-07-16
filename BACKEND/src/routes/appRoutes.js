
const express = require('express');
const router = express.Router();
const { getApplicationsbyId,submitApplication,getApplicationsByUser,updateApplicationStatus } = require('../controllers/appController');
const requireAuth=require('../middleware/authMiddleware');

router.get("/:jobId", requireAuth, getApplicationsbyId);
router.get("/user/:userId",requireAuth,getApplicationsByUser);
router.patch("/:applicationId/status",requireAuth,updateApplicationStatus);
router.post("/submit",submitApplication);


module.exports = router;
