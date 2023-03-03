const express = require('express')
const authController = require('../controllers/auth-controller')
const otpHelper = require('../helpers/otp-helper')
const verifySignup = require('../middlewares/verify-signup')
const tokenMiddleware = require('../middlewares/verify-token')

const router = express.Router()


router
    .route('/signup')
    .post(verifySignup.checkDuplicateUsernameOrEmailOrPhoneno,otpHelper.otpGenerator)

router
    .route('/otp')
    .post(otpHelper.otpVerification,authController.signup)

router
    .route('/login')
    .post(authController.login)


router
    .route('/logout')
    .get(tokenMiddleware.verifyToken,authController.logout)








    module.exports = router