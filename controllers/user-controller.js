const userServices = require('../services/user-services')

const userController = {
  signUpPage: async (req, res) => {
    await res.render('signup')
  },
  signUp: async (req, res, next) => {
    try {
      await userServices.signUp(req)
      req.flash('success_messages', 'Sign up successfully!')
      res.redirect('/signin')
    } catch (err) {
      return next(err)
    }
  },
  signInPage: async (req, res) => {
    await res.render('signin')
  },
  signIn: async (req, res, next) => {
    try {
      await userServices.signIn(req)
      req.flash('success_messages', 'Sign in successfully!')
      res.redirect('/')
    } catch (err) {
      return next(err)
    }
  },
  forgotpasswordPage: async (req, res) => {
    await res.render('forgotpassword')
  }
}

module.exports = userController
