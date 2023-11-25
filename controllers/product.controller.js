const { Product, Category } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const productController = {
  getHomePage: async (req, res, next) => {
    try {
      const latestProducts = await Product.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
        // limit: 4
      })
      const plainProducts = latestProducts.map(product => product.get({ plain: true }))

      const categories = await Category.findAll()
      const categoryTeams = categories.map(category => category.dataValues.name).slice(0, 10)

      const categoryDrivers = categories.map(category => category.dataValues.name).slice(10, 30)

      res.render('homepage', { latestProducts: plainProducts, categoryTeams, categoryDrivers })
    } catch (err) {
      return next(err)
    }
  },
  getCateprod: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 2
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const category = req.query.category
      console.log(category)
      console.log(page)
      console.log(limit)
      console.log(offset)

      const categories = await Category.findAll()
      const categoryTeams = categories.map(categoryteam => categoryteam.dataValues.name).slice(0, 10)

      const categoryDrivers = categories.map(categorydriver => categorydriver.dataValues.name).slice(10, 30)

      const seletedproducts = await Product.findAndCountAll({
        include: [
          { model: Category, as: 'Categoriedproducts', where: category ? { name: category } : undefined }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        limit,
        offset,
        nest: true
      })

      console.log(seletedproducts)

      const plainProducts = seletedproducts.rows.map(product => product.get({ plain: true }))

      await res.render('cateprod', { seletedproducts: plainProducts, category, categories, pagination: getPagination(limit, page, seletedproducts.count), categoryTeams, categoryDrivers })
    } catch (err) {
      return next(err)
    }
  },
  getProductDetails: async (req, res, next) => {
    try {
      const seletedproducts = await Product.findByPk(req.params.id)
      const plainProduct = seletedproducts.get({ plain: true })

      const categories = await Category.findAll()
      const categoryTeams = categories.map(category => category.dataValues.name).slice(0, 10)

      const categoryDrivers = categories.map(category => category.dataValues.name).slice(10, 30)

      await res.render('productdetails', { seletedproducts: plainProduct, categories, categoryTeams, categoryDrivers })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = productController
