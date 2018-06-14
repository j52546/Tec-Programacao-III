const router = require('express').Router()
const clientController = require('../controller/cadastre/client')
const providerController = require('../controller/cadastre/purveyor')

router.use(function(req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/client', clientController.renderPage)
router.post('/client', clientController.createClient)

router.get('/purveyor', providerController.renderPage)
router.post('/purveyor', providerController.savePurveyor)

module.exports = router