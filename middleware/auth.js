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

module.exports = {
  authenticated,
  authenticatedAdmin
}