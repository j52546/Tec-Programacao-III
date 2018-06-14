const router = require('express').Router()

const produtoController = require('../controller/cadastre/produto')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        next()
    }
})

router.get('/all', produtoController.getAllProducts)

router.post('/produto', produtoController.novoProduto)

module.exports = router