const express = require('express');
const router = express.Router();

console.log('Router loaded!!');

const homeController = require('../controller/home-controller');
const signUpController = require('../controller/signUp-controller');
const authController = require('../controller/auth-controller');

router.get('/',homeController.home);
router.get('/sign-up',signUpController.signUp);
router.post('/auth',authController.emailAuth);
router.post('/email-activate',authController.activateAccount)

module.exports = router;