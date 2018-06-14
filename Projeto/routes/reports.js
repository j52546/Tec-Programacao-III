const router = require('express').Router()
const reportsController = require('../controller/reports')

router.use(function(req, res, next){
    if('user' in req.session) {
        next()
    } else {
        res.redirect('/login')
    }
})


router.get('/employee', reportsController.employeePage)
router.get('/products', reportsController.productsPage)

module.exports = router