const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin.controller')

router.get('/categories/:id', adminController.getCategories)
router.put('/categories/:id', adminController.putCategory)
router.delete('/categories/:id', adminController.deleteCategory)
router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.postCategory)

router.get('/', (req, res) => res.redirect('admin/categories'))

module.exports = router
