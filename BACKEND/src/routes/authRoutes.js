
const express = require('express');
const router = express.Router();
const { register, login,verifyAccount,resendOTP } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyAccount);
router.post('/resend-otp', resendOTP);

module.exports = router;
