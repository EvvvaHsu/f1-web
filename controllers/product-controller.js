const { Product } = require('../models')

const productController = {
  lastestproductsection: async (req, res, next) => {
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
  }
}

module.exports = productController
