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

      res.render('homepage', { latestProducts: plainProducts })
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

      const plainProducts = seletedproducts.rows.map(product => product.get({ plain: true }))

      await res.render('cateprod', { seletedproducts: plainProducts, category, pagination: getPagination(limit, page, seletedproducts.count) })
    } catch (err) {
      return next(err)
    }
  },
  getProductDetails: async (req, res, next) => {
    try {
      const seletedproducts = await Product.findByPk(req.params.id)
      const plainProduct = seletedproducts.get({ plain: true })
      console.log(seletedproducts)

      await res.render('productdetails', { seletedproducts: plainProduct })
    } catch (err) {
      return next(err)
    }
  },
  getCartPage: async (req, res) => {
    const cartItems = req.session.cart ? req.session.cart : []
    const totalAmounts = cartItems.map(item => item.qty * Number(item.amount))

    let totalAmount = 0
    totalAmounts.forEach(price => { totalAmount += price })

    await res.render('cart', { cartItems, totalAmount })
  },
  postAddToCart: async (req, res, next) => {
    try {
      const productId = parseInt(req.body.id, 10)
      const quantity = parseInt(req.body.quantity, 10)
      console.log(req.body)
      const seletedproducts = await Product.findByPk(productId)
      console.log('produxt!!!!!!!!!!!!!', seletedproducts)

      const cart = req.session.cart || []
      const cartItem = cart.find(item => item.id === productId)

      if (cartItem) {
        cartItem.qty += quantity
        // console.log('qty@@@@@@@@@@@@@@', cartItem.qty)
      } else {
        cart.push({
          product: seletedproducts,
          qty: quantity,
          amount: seletedproducts.amount,
          name: seletedproducts.name,
          size: seletedproducts.size,
          quantity: seletedproducts.quantity,
          image: seletedproducts.image,
          description: seletedproducts.description,
          id: seletedproducts.id
        })
        req.session.cart = cart
      }

      console.log('cart@@@@@@@@@@@@@@', req.session.cart)

      res.redirect('/cart')
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = productController
