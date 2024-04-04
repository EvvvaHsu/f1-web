const express = require('express')
const router = express.Router()
// const upload = require('../../middleware/multer')
const userController = require('../../controllers/user.controller')
const productController = require('../../controllers/product.controller')

router.get('/', userController.getCartPage)

router.get('/add/:id', productController.getAddToCart)

module.exports = router
