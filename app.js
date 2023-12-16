// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
// }

const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helper')
const { getUser } = require('./helpers/auth-helpers')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

const SESSION_SECRET = 'secret'

app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true, cookie: { secure: false } }))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use('/helpers', express.static(path.join(__dirname, 'helpers')))

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.info(`Example app listening on http://localhost:${PORT}`)
})

module.exports = app
