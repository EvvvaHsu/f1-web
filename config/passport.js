const passport = require('passport')
const LocalStrategy = require('passport-local')
// const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

passport.use('user-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'passhash',
      passReqToCallback: true
    },
    async (req, email, passhash, cb) => {
      try {
        const user = await User.findOne({ where: { email } })

        if (!email || !passhash) throw new Error('All fields are required')

        if (!user) {
          return cb(null, false, req.flash('error_messages', 'Incorrect email or password'))
        }

        const res = await bcrypt.compare(passhash, user.passhash)

        if (!res) {
          return cb(null, false, req.flash('error_messages', 'Incorrect email or password'))
        }

        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.use('admin-local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'passhash',
      passReqToCallback: true
    },
    async (req, email, passhash, cb) => {
      try {
        const user = await User.findOne({ where: { email } })

        if (!email || !passhash) throw new Error('All fields are required')

        if (!user) {
          return cb(null, false, req.flash('error_messages', 'Incorrect email or password'))
        }

        const res = await bcrypt.compare(passhash, user.passhash)

        if (!res) {
          return cb(null, false, req.flash('error_messages', 'Incorrect email or password'))
        }

        if (!user.isAdmin) {
          return cb(null, false, req.flash('error_messages', 'Access denied! Only administrators can sign in here.'))
        }

        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.serializeUser(async (user, cb) => {
  try {
    cb(null, user.id)
  } catch (err) {
    cb(err)
  }
})

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id)

    if (!user) {
      return cb(null, null)
    }

    const userJSON = user.toJSON()
    console.log(userJSON)
    return cb(null, userJSON)
  } catch (err) {
    return cb(err)
  }
})

module.exports = passport
