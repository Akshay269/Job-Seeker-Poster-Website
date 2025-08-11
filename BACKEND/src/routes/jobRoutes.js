
const express = require('express');
const router = express.Router();
const { getAllJobs, postJob,getPostedJobs,getJobDetails } = require('../controllers/jobsController');
const requireAuth=require('../middleware/authMiddleware');

router.get("/postedjobs", requireAuth, getPostedJobs);
router.get('/:jobId',requireAuth,getJobDetails);
router.post("/post-job", requireAuth, postJob);
router.get('/', getAllJobs);

module.exports = router;
