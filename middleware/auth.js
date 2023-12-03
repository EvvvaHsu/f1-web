const { getUser, ensureAuthenticated } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req) && getUser(req).isAdmin) {
    return next()
  }
  res.redirect('/signin')
}

const isLoggedIn = (req, res, next) => {
  if (getUser(req) && ensureAuthenticated(req)) {
    res.redirect('/')
  }
  next()
}

module.exports = {
  authenticated,
  authenticatedAdmin,
  isLoggedIn
}
