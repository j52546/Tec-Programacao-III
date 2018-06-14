const loginDAO = require('../model/login/loginDAO')

const login = (req, res) => {
     res.render('auth/login')
}

const doLogin = (req, res) => {
    loginDAO.doLogin(req.body)
    .then( result => {
        console.log('RESULT = ', result)
        if(result.message === 'user not found') {
            res.redirect('/register')
        } else if(result.message === 'fail to auth') {
            res.locals.error = true
            res.render('auth/login')
        } else if(result.message === 'not authorization') {
            res.locals.notAuthorizated = true
            res.render('auth/login')
        } else {
            req.session.user = result.user
            res.redirect('/')
        }
    })
    .catch( err => {
        res.redirect('/login')
    })
}

module.exports = {
    login,
    doLogin
}