
const express = require('express');
const router = express.Router();
const { getAllJobs, postJob,getPostedJobs,getJobDetails } = require('../controllers/jobsController');
const requireAuth=require('../middleware/authMiddleware');

router.get("/postedjobs", requireAuth, getPostedJobs); // Put static first
router.get('/', getAllJobs);
router.get('/:jobId',getJobDetails);
//Keeping dynamic routes at the bottom
router.post("/post-job", requireAuth, postJob);


module.exports = router;
