const express = require('express')
const router = express.Router()
const auth  = require('../Controller/index')
router.get('/',auth.pageInitial)

module.exports = router
