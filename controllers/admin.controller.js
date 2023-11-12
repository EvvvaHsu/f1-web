const { raw } = require('express')
const { Category } = require('../models')

const adminController = {
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })

      if (!categories) return ''

      const category = await Category.findByPk(req.params.id, { raw: true })

      res.render('admin/categories', { categories, category })
    } catch (err) {
      return next(err)
    }
  },
  postCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('Category name is required')

      const category = await Category.create({ name }, { raw: true })

      if (!category) return ''

      res.redirect('/admin/categories')
    } catch (err) {
      return next(err)
    }
  },
  putCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('Category name is required')

      const category = await Category.findByPk(req.params.id)

      if (!category) return ''

      await category.update({ name })

      res.redirect('/admin/categories')
    } catch (err) {
      return next(err)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id)

      if (!category) throw new Error('Category does not exist')

      await category.destroy()

      res.redirect('/admin/categories')
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = adminController
