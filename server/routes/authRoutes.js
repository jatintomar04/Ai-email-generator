const express = require('express');
const { loginUser, registerUser, verifyUser, loginWithotp } = require('../controller/authController');
const router = express.Router();
const sendEmail = require("../utils/sendEmail");



router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/login/otp',loginWithotp)
router.post('/verify-otp',verifyUser)



module.exports = router;