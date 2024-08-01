const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')

const adminController = require('../../controllers/admin.controller')

router.get('/products/create', adminController.getCreateProduct)
router.get('/products/:id/edit', adminController.getEditProduct)
router.put('/products/:id', upload.single('image'), adminController.putProduct)
router.delete('/products/:id', adminController.deleteProduct)
router.get('/products', adminController.getProducts)
router.post('/products', upload.single('image'), adminController.postProduct)

router.get('/categories/:id', adminController.getCategories)
router.put('/categories/:id', adminController.putCategory)
router.delete('/categories/:id', adminController.deleteCategory)
router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.postCategory)

router.get('/orders/:id', adminController.getOrderdetails)
router.delete('/orders/:id', adminController.deleteOrderdetails)
router.get('/orders', adminController.getOrders)

router.get('/', (req, res) => res.redirect('admin/products'))

module.exports = router
