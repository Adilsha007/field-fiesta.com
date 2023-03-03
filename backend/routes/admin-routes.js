const express = require('express')
const authController = require('../controllers/auth-controller')
const verifySignup = require('../middlewares/verify-signup')

const router = express.Router()


router
    .route('/login')
    .post(authController.admin_login)

router
    .route('/signup')
    .post(authController.admin_signup)



    module.exports = router