const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')

router.get('/', productController.getCartPage)

router.post('/add', productController.postAddToCart)

module.exports = router
