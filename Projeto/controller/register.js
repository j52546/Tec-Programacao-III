const createAccountDAO = require('../model/createAccount/createAccountDAO')
const KEY_DRUP = 'ER_DUP_ENTRY'
const userDAO = createAccountDAO
const CONSTANTS = require('../util/CONSTANTS.JS')

const registerPage = (request, response) => {
    response.render('auth/createAccount')
}

const registerUser = (req, res) => {
    createAccountDAO.createAccount(req.body).then(result => {
        console.log('result register = ', result)
        if(result instanceof Error) {
            if(result.code === KEY_DRUP) {
                res.locals.KEY_DRUP = true;
                res.render('auth/createAccount')
            } else {
                res.locals.errorToCreateAccount = true
                res.render('auth/createAccount')
            }
        } else {
            res.locals.successToCreateAccount = true
            res.render('auth/login')
        }
    }).catch( err => {
        res.status(500)
        res.locals.errorToCreateAccount = true
        res.render('auth/createAccount')
    })
}

const updateUser = (req, res) => {
    userDAO.updateUser(req.body, req.session.user.id)
    .then(()=>{
        req.session.user.name = req.body.name
        req.session.user.email = req.body.email
        res.locals.user = req.session.user
        res.status(200).end()
    })
    .catch(err=>{
        console.log('ERROR: ', err)
        res.status(500).end()
    })
}

const renderPage = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    res.render('home/edit')
}

module.exports = {
    registerPage,
    registerUser,
    updateUser,
    renderPage
}