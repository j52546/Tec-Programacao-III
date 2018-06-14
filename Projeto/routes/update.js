const router = require('express').Router()

const userController = require('../controller/register')

router.use((req, res, next) => {
    if('user' in req.session) {
        next()
    } else {
        res.status(401).end()
    }
})

router.post('/user', userController.updateUser)
router.get('/account', userController.renderPage)

module.exports = router