const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')

const { authenticated, authenticatedAdmin, isLoggedIn } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

const { Category } = require('../models')

router.use(async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.locals.categoryTeams = categories.map(category => category.dataValues.name).slice(0, 10)
    res.locals.categoryDrivers = categories.map(category => category.dataValues.name).slice(10, 30)

    next()
  } catch (err) {
    next(err)
  }
})

router.use('/admin', authenticatedAdmin, admin)

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)

router.get('/signin', isLoggedIn, userController.getSignInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)

router.get('/logout', userController.getLogout)

router.get('/forgotpassword', userController.getForgotpasswordPage)
router.post('/forgotpassword', userController.postForgotPassword)

router.get('/resetpassword/:id/:token', userController.getResetPasswordPage)
router.post('/resetpassword/:id/:token', userController.postResetPassword)

router.get('/cart', authenticated, userController.getCartPage)

router.get('/cateprod/:id', authenticated, productController.getProductDetails)
router.get('/cateprod', authenticated, productController.getCateprod)

router.get('/', authenticated, productController.getHomePage)

router.use('/', generalErrorHandler)

module.exports = router
