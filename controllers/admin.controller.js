const { Category } = require('../models')

const adminController = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })

      res.render('admin/categories', { categories })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = adminController
