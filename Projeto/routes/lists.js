const router = require('express').Router()
const providerController = require('../controller/cadastre/purveyor')
const clientController = require('../controller/cadastre/client')
const productController = require('../controller/cadastre/produto')


router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/purveyor', providerController.getPurveyors)
router.get('/clients', clientController.getClients)
router.get('/products', productController.getAllProductsAndRender)
router.get('/entrance/exit', productController.renderPageEntranceAndExit)
router.get('/entrance', productController.getProductEnter)
router.get('/exit', productController.getProductExit)

module.exports = router