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
      // console.log('userId!!!!!!!!!!!!!', userId)

      const ponumber = uuidv4()

      /// // get cart total amount
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

      /// //// create a new order
      const newOrder = await Orders.create({
        userId,
        ponumber,
        amount: totalAmount,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log('newOrder!!!!!!!!!!!!!', newOrder)

      /// //// create order details
      cartItems.forEach(async item => {
        await Orderdetails.create({
          userId,
          orderId: newOrder.id,
          productId: item.id,
          name: item.name,
          amount: item.amount,
          quantity: item.qty,
          size: item.size,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })

      /// / create payment
      const payment = await Payments.create({
        userId,
        orderId: newOrder.id,
        amount: totalAmount,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      res.redirect('/payment')
    } catch (err) {
      console.log(err)
      return next(err)
    }
  },
  getPaymentPage: async (req, res, next) => {
    try {
      const crypto = require('crypto')
      // Step1: 參數
      const MerchantID = '3002607' // 必填
      const MerchantTradeNo = 'qweqwe123123' // 必填
      const MerchantTradeDate = '2024/08/01 19:29:20' // 必填 格式為：yyyy/MM/dd HH:mm:ss
      const PaymentType = 'aio' // 必填
      const TotalAmount = '100' // 必填
      const TradeDesc = '交易品項' // 必填
      const ItemName = '交易名稱' // 必填
      const ReturnURL = 'https://www.ecpay.com.tw' // 必填
      const ChoosePayment = 'ALL' // 必填
      const EncryptType = '1' // 必填, 使用sha256加密
      const HashKey = 'pwFHCqoQZGmho4w6' // 3002607
      const HashIV = 'EkRm7iFT261dpevs' // 3002607

      // Step2: 結合參數和值形成字串
      const params = {
        HashKey,
        MerchantID,
        MerchantTradeNo,
        MerchantTradeDate,
        PaymentType,
        TotalAmount,
        TradeDesc,
        ItemName,
        ReturnURL,
        ChoosePayment,
        EncryptType,
        HashIV
      }

      const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

      // Step3: 用URL encode轉換

      const encodeQueryString = encodeURIComponent(queryString)

      // Step4: 轉換成小寫

      const lowerCaseEncodeQueryString = encodeQueryString.toLowerCase()

      // Step5: 用SHA-256加密雜湊

      const sha256Encode = crypto.createHash('sha256').update(lowerCaseEncodeQueryString).digest('hex')

      // Step6: 轉換成大寫

      const CheckMacValue = sha256Encode.toUpperCase()

      console.log(CheckMacValue)

      res.render('payment', {
        MerchantID,
        MerchantTradeNo,
        MerchantTradeDate,
        PaymentType,
        EncryptType,
        TotalAmount,
        TradeDesc,
        ItemName,
        ReturnURL,
        ChoosePayment,
        CheckMacValue
      })
    } catch (err) {
      return next(err)
    }
  },
  postPayment: async (req, res, next) => {
    try {
      const { MerchantID, MerchantTradeNo, MerchantTradeDate, PaymentType, EncryptType, TotalAmount, TradeDesc, ItemName, ReturnURL, ChoosePayment, CheckMacValue } = req.body

      res.redirect('/', {
        MerchantID,
        MerchantTradeNo,
        MerchantTradeDate,
        PaymentType,
        EncryptType,
        TotalAmount,
        TradeDesc,
        ItemName,
        ReturnURL,
        ChoosePayment,
        CheckMacValue
      })
    } catch (err) {
      console.log(err)
      return next(err)
    }
  }
}

module.exports = productController
