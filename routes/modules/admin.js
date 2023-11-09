const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin.controller')

router.get('/categories', adminController.getCategories)

router.get('/', (req, res) => res.redirect('admin/categories'))

module.exports = router
