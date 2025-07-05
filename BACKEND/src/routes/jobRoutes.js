
const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, postJob } = require('../controllers/jobsController');
const requireAuth=require('../middleware/authMiddleware');

router.get('/', getAllJobs);
router.get('/:jobId', getJobById);
router.post("/post-job", requireAuth, postJob);

module.exports = router;
