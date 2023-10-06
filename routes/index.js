const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const productController = require('../controllers/product-controller')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)

router.get('/forgotpassword', userController.forgotpasswordPage)

router.get('/cart', userController.cartPage)

router.get('/', productController.lastestproductsection)

module.exports = router
