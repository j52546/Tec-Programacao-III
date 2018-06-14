const router = require('express').Router()

const logoutController = require('../controller/logout')

router.get('/', logoutController.logout)

module.exports = router