const router = require('express').Router()
const forgotPasswordController = require('../controller/forgotPassword')

router.get('/', forgotPasswordController.forgotPassword)
router.post('/', forgotPasswordController.postPassword)

router.get('/:id', forgotPasswordController.recoverPasswordPage)
router.post('/:id', forgotPasswordController.recoverPassword)

module.exports = router