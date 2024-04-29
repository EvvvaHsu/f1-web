const express = require('express')
const router = express.Router()
// const upload = require('../../middleware/multer')
const userController = require('../../controllers/user.controller')
const productController = require('../../controllers/product.controller')

router.get('/', productController.getCartPage)

router.post('/add/:id', productController.postAddToCart)

module.exports = router
