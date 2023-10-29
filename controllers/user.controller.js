const bcrypt = require('bcrypt')
// const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
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
  getForgotpasswordPage: async (req, res, next) => {
    await res.render('forgotpassword')
  },
  postForgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body
      // res.send(email)

      const user = await User.findOne({ where: { email }, raw: true })

      if (!user) throw new Error('User does not exist')

      const secret = JWT_SECRET + user.passhash
      const payload = {
        email: user.email,
        id: user.id
      }
      const token = jwt.sign(payload, secret, { expiresIn: '1d' })
      const link = `http://localhost:3000/resetpassword/${user.id}/${token}`

      console.log(link)
      req.flash('success_messages', 'link has been sent to your email !')
      res.redirect('/forgotpassword')
    } catch (err) {
      return next(err)
    }
  },
  getResetPasswordPage: async (req, res, next) => {
    try {
      const { id, token } = req.params
      // res.send(req.params)

      const user = await User.findOne({ where: { id }, raw: true })

      if (!user) throw new Error('User does not exist')

      const secret = JWT_SECRET + user.passhash
      const payload = jwt.verify(token, secret)
      await res.render('resetpassword', { email: payload.email })
    } catch (err) {
      return next(err)
    }
  },
  postResetPassword: async (req, res, next) => {
    try {
      const { id, token } = req.params
      const { passhash, passhashCheck } = req.body

      const user = await User.findOne({ where: { id }, raw: true })

      if (!user) throw new Error('User does not exist')
      if (passhash !== passhashCheck) throw new Error('Password does not match')

      const secret = JWT_SECRET + user.passhash
      const payload = jwt.verify(token, secret)

      await User.update({ passhash: await bcrypt.hash(passhash, 10) }, { where: { id } })

      req.flash('success_messages', 'Password has been reset!')
      res.redirect('/signin')
    } catch (err) {
      return next(err)
    }
  },
  getCartPage: async (req, res) => {
    await res.render('cart')
  }
}

module.exports = userController
