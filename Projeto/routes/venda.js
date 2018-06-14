const router = require('express').Router()

const vendaController = require('../controller/cadastre/venda')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})


router.get('/', vendaController.renderPage)
router.post('/', vendaController.doSell)

router.post('/find', vendaController.findClientAndProduct)

module.exports = router