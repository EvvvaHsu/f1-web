const userServices = require('../services/user-services')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', 'Sign up successfully!')
      res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) => {
      if (err) return next(err)

      req.flash('success_messages', 'Sign in successfully!')
      res.redirect('/')
    })
  },
  forgotpasswordPage: (req, res) => {
    res.render('forgotpassword')
  }
}

module.exports = userController
