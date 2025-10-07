
const express = require('express');
const router = express.Router();
const { getSignature,deleteFile } = require('../controllers/cloudController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/signature',requireAuth, getSignature);
router.post('/delete',requireAuth,deleteFile);

module.exports = router;
