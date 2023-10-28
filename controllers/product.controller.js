const { Product } = require('../models')
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
      res.render('homepage', { latestProducts: plainProducts })
    } catch (err) {
      return next(err)
    }
  },
  getCateprod: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 4
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)

      const benzproducts = await Product.findAndCountAll({
        order: [
          ['createdAt', 'DESC']
        ],
        limit,
        offset,
        nest: true
      })
      const plainBenzproducts = benzproducts.rows.map(product => product.get({ plain: true }))
      await res.render('cateprod', { benzproducts: plainBenzproducts, pagination: getPagination(limit, page, benzproducts.count) })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = productController
