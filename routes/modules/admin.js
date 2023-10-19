const express = require('express')
const router = express.Router()

router.use('/', (req, res) => res.redirect('/admin/adminpage'))

module.exports = router
