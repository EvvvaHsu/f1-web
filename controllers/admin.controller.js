const { Category, Product } = require('../models')

const { localFileHandler } = require('../helpers/file-helpers')

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
  },
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.findAll({ raw: true })

      if (!products) return ''

      res.render('admin/products', { products })
    } catch (err) {
      return next(err)
    }
  },
  getCreateProduct: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })

      if (!categories) return ''

      res.render('admin/create-product', { categories })
    } catch (err) {
      return next(err)
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const { name, amount, stock, size, description } = req.body
      if (!name || !amount || !stock || !size || !description) throw new Error('All fields are required')

      const { file } = req
      let filePath = ''

      if (file) {
        filePath = await localFileHandler(file)
      }

      const newProduct = await Product.create({
        name,
        amount,
        stock,
        size,
        description,
        image: filePath,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      req.flash('success_messages', 'Product created successfully!')
      req.session.createdData = { product: newProduct }

      res.redirect('/admin/products')
    } catch (err) {
      return next(err)
    }
  },
  getEditProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, { raw: true })

      res.render('admin/edit-product', { product })
    } catch (err) {
      return next(err)
    }
  },
  putProduct: async (req, res, next) => {
    try {
      const { name, amount, stock, size, description } = req.body
      if (!name || !amount || !stock || !size || !description) throw new Error('All fields are required')

      const product = await Product.findByPk(req.params.id)
      if (!product) throw new Error('Product does not exist')

      const { file } = req
      const filePath = file ? await localFileHandler(file) : null

      await product.update({
        name,
        amount,
        stock,
        size,
        description,
        image: filePath || product.image,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      req.flash('success_messages', 'Product updated successfully!')
      res.redirect('/admin/products')
    } catch (err) {
      return next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id)

      if (!product) throw new Error('Product does not exist')

      await product.destroy()

      res.redirect('/admin/products')
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = adminController
