const express = require('express')
const router = express.Router()
const loginController = require('../controller/login')

router.get('/', loginController.login)
router.post('/', loginController.doLogin)

module.exports = router
