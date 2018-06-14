const router = require('express').Router()

const clientController = require('../controller/client')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/all', clientController.allClients)

module.exports = router