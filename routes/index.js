const express = require('express')
const router = express.Router()

router.get('/signup', (req, res) => res.render('signup'))
router.get('/signin', (req, res) => res.render('signin'))
router.get('/forgotpassword', (req, res) => res.render('forgotpassword'))

router.get('/', (req, res) => res.render('homepage'))

module.exports = router
