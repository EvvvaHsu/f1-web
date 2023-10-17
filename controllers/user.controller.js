const bcrypt = require('bcrypt')
// const sequelize = require('sequelize')
// const jwt = require('jsonwebtoken')
const { User } = require('../models')
// const { Op } = sequelize

const userController = {
  getSignUpPage: async (req, res) => {
    await res.render('signup')
  },
  postSignUp: async (req, res, next) => {
    try {
      const { firstname, lastname, email, passhash, passwordCheck } = req.body

      if (passhash !== passwordCheck) throw new Error('Password does not match')

      if (!firstname || !lastname || !email || !passhash || !passwordCheck) throw new Error('All fields are required')

      const user = await User.findOne({ where: { email } })

      if (user) {
        if (user.email === email) throw new Error('Email already exists')
      }

      await User.create({
        firstname,
        lastname,
        email,
        passhash: await bcrypt.hash(passhash, 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      req.flash('success_messages', 'Sign up successfully!')
      res.redirect('/signin')
    } catch (err) {
      return next(err)
    }
  },
  getSignInPage: async (req, res) => {
    await res.render('signin')
  },
  postSignIn: async (req, res, next) => {
    try {
      req.flash('success_messages', 'Sign in successfully!')
      res.redirect('/')
    } catch (err) {
      return next(err)
    }
  },
  getLogout: async (req, res) => {
    req.flash('success_messages', 'Sign out successfully!')
    req.logout()
    res.redirect('/signin')
  },
  getForgotpasswordPage: async (req, res) => {
    await res.render('forgotpassword')
  },
  getCartPage: async (req, res) => {
    await res.render('cart')
  }
}

module.exports = userController
