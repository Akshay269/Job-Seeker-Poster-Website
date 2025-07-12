
const express = require('express');
const router = express.Router();
const { getSignature,deleteFile } = require('../controllers/cloudController');

router.get('/signature', getSignature);
router.post('/delete',deleteFile);

module.exports = router;
