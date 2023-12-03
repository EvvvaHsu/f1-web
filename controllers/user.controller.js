const bcrypt = require('bcrypt')
// const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const { User } = require('../models')
const { authenticatedAdmin } = require('../middleware/auth')
const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')
const nodemailer = require('nodemailer')
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
  getAdminSignInPage: async (req, res) => {
    await res.render('adminsignin')
  },
  postAdminSignIn: async (req, res, next) => {
    try {
      req.flash('success_messages', 'Admin sign in successfully!')
      res.redirect('/admin')
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
      const HOST = process.env.HOST
      const user = await User.findOne({ where: { email }, raw: true })

      if (!user) throw new Error('User does not exist')

      const secret = JWT_SECRET + user.passhash
      const payload = {
        email: user.email,
        id: user.id
      }
      const token = jwt.sign(payload, secret, { expiresIn: '30m' })
      const link = HOST + `/resetpassword/${user.id}/${token}`

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      })

      await transporter.verify()

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'Sending Email using Node.js',
        text: link
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      console.info(link)
      req.flash('success_messages', 'link has been sent to your email !')
      res.redirect('/forgotpassword')
    } catch (err) {
      return next(err)
    }
  },
  getResetPasswordPage: async (req, res, next) => {
    try {
      const { token } = req.params
      console.log(req.params)

      const decoded = jwt.decode(token)
      if (!decoded) throw new Error('Invalid token')

      const user = await User.findOne({ where: { id: decoded.id }, raw: true })

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
      const { token } = req.params
      const { passhash, passhashCheck } = req.body

      const decoded = jwt.decode(token)
      if (!decoded) throw new Error('Invalid token')

      const user = await User.findOne({ where: { id: decoded.id }, raw: true })

      if (!user) throw new Error('User does not exist')
      if (passhash !== passhashCheck) throw new Error('Password does not match')

      const secret = JWT_SECRET + user.passhash
      const payload = jwt.verify(token, secret)
      console.info(payload)

      await User.update({ passhash: await bcrypt.hash(passhash, 10), token }, { where: { id: decoded.id } })

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
