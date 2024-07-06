const { Cartdetails, Product } = require('../models')

const getCartDetails = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }

  try {
    const userId = req.user.id

    const cartDetails = await Cartdetails.findAll({
      where: { userId },
      include: [{ model: Product, as: 'CartdetailsProduct' }]
    })

    const cartItems = cartDetails.map(cartDetail => ({
      id: cartDetail.productId,
      name: cartDetail.CartdetailsProduct.name,
      amount: cartDetail.amount,
      qty: cartDetail.quantity,
      image: cartDetail.CartdetailsProduct.image,
      size: cartDetail.CartdetailsProduct.size
    }))

    res.locals.cartItems = cartItems
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = getCartDetails
