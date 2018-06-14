const homeDAO = require('../../model/home/index')
const CONSTANTS = require('../../util/CONSTANTS.JS')
const clientDAO = require('../../model/client/clientDAO')
let users = new Array()
const renderPage = (req, res) => {
    if(req.session.user.role.toUpperCase() === CONSTANTS.ROLES.MANAGER.toUpperCase()) {
        homeDAO.getAccountDontAuthorizated()
        .then( result => {
            if(result && result[0].length > 0) {
                users = res.locals.users = result[0] 
            } else {
                users = new Array()
            }
            res.render('cadastre/client')
        })
        .catch( err => {
            console.log('ERROR: ',err)
            res.redirect('/login')
        })
    } else {
        res.render('cadastre/client')
    }

}

const createClient = (req, res) => {
    clientDAO.saveClient(req.body)
    .then(result => {
        console.log('RESULT = ', result)
        res.locals.users = users
        res.locals.successRegisterClient = true
        res.render('cadastre/client')
    })
    .catch( err => {
        if(err.code === 'ER_DUP_ENTRY') {
            res.locals.users = users
            res.locals.clientAlreadyExist = true
            res.render('cadastre/client')
        } else {
            res.locals.users = users
            res.locals.errorSaveClient = true
            res.render('cadastre/client')
        }
    })    
}

const getClients = (req, res) => {
    clientDAO.getClients()
    .then( result => {
        if(result && result[0].length > 0) {
            res.locals.users = users
            res.locals.allClients = result[0]
        }
        res.render('lists/listClients')
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
}


module.exports = {
    renderPage,
    createClient,
    getClients
}