const router = require('express').Router()
const checkController = require('../controller/auth')
router.use((req, res, next)=>{
    if('user' in req.session) {
        next()
    } else {
        res.status(401).end()
    }
})

router.post('/password', checkController.verifyPassword)

module.exports = router