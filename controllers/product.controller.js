const { Carts, Cartdetails, Product, Category, Orders, Orderdetails, Payments } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { v4: uuidv4 } = require('uuid')

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
  getCartPage: async (req, res, next) => {
    try {
      const userId = req.user.id

      const cartDetails = await Cartdetails.findAll({
        where: { userId },
        include: [{ model: Product, as: 'CartdetailsProduct' }]
      })
      // console.log('cartDetails!!!!!!!!!!!!!', cartDetails)

      const cartItems = cartDetails.map(cartDetail => ({
        id: cartDetail.productId,
        name: cartDetail.CartdetailsProduct.name,
        amount: cartDetail.amount,
        qty: cartDetail.quantity,
        image: cartDetail.CartdetailsProduct.image,
        size: cartDetail.CartdetailsProduct.size
      }))
      // console.log(cartItems.length)

      let totalAmount = 0
      cartItems.forEach(item => {
        totalAmount += item.qty * Number(item.amount)
      })

      await res.render('cart', { cartItems, totalAmount })
    } catch (err) {
      return next(err)
    }
  },
  postAddToCart: async (req, res, next) => {
    try {
      const productId = parseInt(req.body.id, 10)
      const quantity = parseInt(req.body.quantity, 10)
      // console.log(req.body)

      const userId = req.user.id
      // console.log('userId!!!!!!!!!!!!!', userId)

      const seletedproducts = await Product.findByPk(productId)
      // console.log('produxt!!!!!!!!!!!!!', seletedproducts)

      const cart = req.session.cart || []
      const cartItem = cart.find(item => item.id === productId)

      const [cartdb] = await Carts.findOrCreate({
        where: {
          userId
        },
        defaults: {
          userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      const cartId = cartdb.dataValues.id
      const cartdetails = await Cartdetails.findOne({
        where: {
          userId,
          productId: productId
        }
      })

      if (cartdetails) {
        cartdetails.quantity += quantity
        await cartdetails.save()
      } else {
        await Cartdetails.create({
          userId,
          cartId: cartId,
          productId,
          amount: seletedproducts.amount,
          quantity,
          size: seletedproducts.size,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      // console.log('cartdetails@@@@@@@@@@@@@@', cartdetails)

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

      // console.log('cart@@@@@@@@@@@@@@', req.session.cart)
      // console.log('cart!!!!!!!!!!!!!', cart)

      res.redirect('/cart')
    } catch (err) {
      return next(err)
    }
  },
  postCheckout: async (req, res, next) => {
    try {
      const userId = req.user.id
      console.log('userId!!!!!!!!!!!!!', userId)

      const { totalAmount } = req.body
      const ponumber = uuidv4()

      const newOrder = await Orders.create({
        userId,
        ponumber,
        amount: totalAmount,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log(newOrder)

      res.redirect('/homepage')
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = productController
