
const express = require('express');
const router = express.Router();
const { register, login,verifyAccount,resendOTP,refreshToken,forgotPassword,resetPassword, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyAccount);
router.post('/resend-otp', resendOTP);
router.get('/refresh-token',refreshToken);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/logout',logout);

module.exports = router;
