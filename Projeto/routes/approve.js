const router = require('express').Router()
const approveController = require('../controller/approve')

router.use(function (req, res, next) {
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/sales', approveController.renderPageSales)
router.post('/sales', approveController.approveSale)
router.post('/sales/items', approveController.getItemsById)

router.get('/purchases', approveController.renderPagePurchases)
router.post('/purchases', approveController.approvePurchases)
router.post('/purchases/items', approveController.findPurchasesById)
module.exports = router
