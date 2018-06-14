const router = require('express').Router()
const compraController = require('../controller/compra/produtos')
const purveyorController = require('../controller/cadastre/purveyor')
router.use((req, res, next) => {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/produtos', compraController.renderPage)
router.post('/produtos', compraController.newProduct)

router.post('/find/purveyor', purveyorController.findPurveyor)

module.exports = router