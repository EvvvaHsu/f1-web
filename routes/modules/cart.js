const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')

router.get('/', productController.getCartPage)

router.post('/add', productController.postAddToCart)

router.post('/checkout', productController.postCheckout)

module.exports = router
