const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')

const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)

router.get('/signin', userController.getSignInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)

router.get('/logout', userController.getLogout)

router.get('/forgotpassword', userController.getForgotpasswordPage)

router.get('/cart', authenticated, userController.getCartPage)

router.get('/cateprod', authenticated, productController.getCateprod)

router.get('/', authenticated, productController.getHomePage)

router.use('/', generalErrorHandler)

module.exports = router
