const router = require('express').Router()
const registerController = require('../controller/register')
router.get('/', registerController.registerPage)
router.post('/', registerController.registerUser)
module.exports = router