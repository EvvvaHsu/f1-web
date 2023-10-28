const { Product } = require('../models')

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
      const benzproducts = await Product.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      const plainBenzproducts = benzproducts.map(product => product.get({ plain: true }))
      res.render('cateprod', { benzproducts: plainBenzproducts })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = productController
