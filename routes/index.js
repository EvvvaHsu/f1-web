const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')

const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)

router.get('/signin', userController.getSignInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)

router.get('/forgotpassword', userController.getForgotpasswordPage)

router.get('/cart', userController.getCartPage)

router.get('/cateprod', productController.getCateprod)

router.get('/', productController.getHomePage)

router.use('/', generalErrorHandler)

module.exports = router
