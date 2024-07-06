const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const cart = require('./modules/cart')
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const getCartDetails = require('../middleware/getCartDetails')

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

router.use(getCartDetails)

router.get('/api/allCategories', async (req, res, next) => {
  try {
    const categories = await Category.findAll({ raw: true })

    if (!categories) return ''

    res.json({ data: categories })
  } catch (err) {
    return next(err)
  }
})

router.get('/api/allCategories', async (req, res, next) => {
  try {
    const categories = await Category.findAll({ raw: true })

    if (!categories) return ''

    res.json({ data: categories })
  } catch (err) {
    return next(err)
  }
})

router.get('*', async (req, res, next) => {
  try {
    res.locals.cart = req.session.cart
    next()
  } catch (err) {
    next(err)
  }
})

router.use('/admin', authenticatedAdmin, admin)
router.use('/cart', authenticated, cart)

router.get('/signup', userController.getSignUpPage)
router.post('/signup', userController.postSignUp)

router.get('/signin', isLoggedIn, userController.getSignInPage)
router.post('/signin', passport.authenticate('user-local', { failureRedirect: '/signin', failureFlash: true }), userController.postSignIn)

router.get('/adminsignin', isLoggedIn, userController.getAdminSignInPage)
router.post('/adminsignin', passport.authenticate('admin-local', { failureRedirect: '/adminsignin', failureFlash: true }), userController.postAdminSignIn)

router.get('/logout', userController.getLogout)

router.get('/forgotpassword', userController.getForgotpasswordPage)
router.post('/forgotpassword', userController.postForgotPassword)

router.get('/resetpassword/:id/:token', userController.getResetPasswordPage)
router.post('/resetpassword/:id/:token', userController.postResetPassword)

router.get('/cateprod/:id', authenticated, productController.getProductDetails)
router.get('/cateprod', authenticated, productController.getCateprod)

router.get('/', authenticated, productController.getHomePage)

router.use('/', generalErrorHandler)

module.exports = router
