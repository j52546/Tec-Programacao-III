const homeDAO = require('../model/home/index')
const CONSTANTS = require('../util/CONSTANTS.JS')
const productDAO = require('../model/product/productDAO')
const clientDAO = require('../model/client/clientDAO')

const renderPage = async (req, res) => {
    if(req.session.user.role.toUpperCase() === CONSTANTS.ROLES.MANAGER.toUpperCase()) {
        try {
            const result = await homeDAO.getAccountDontAuthorizated()
            if(result && result[0].length > 0) {
                CONSTANTS.USERS = result[0]
                res.locals.users = result[0] 
            }
            let productResult = await productDAO.getFiveProductsMoreSale('quantidade')
            if(productResult && productResult[0].length > 0) {
                res.locals.reportsProducts = productResult[0]
            }
            let productPrice = await productDAO.getFiveProductsMoreSale('renda_final')
            if(productPrice && productPrice[0].length > 0) {
                res.locals.productPrice = productPrice[0]
            }
            let clients = await clientDAO.getFiveClientsWhoSpentMost()
            if(clients && clients[0].length > 0) {
                res.locals.clientsWhoSpentMost = clients[0]
            }
            res.render('home/index')
            
        } catch (error) {
            console.log('ERROR: ',err)
            res.redirect('/login')
       
        }
    } else {
        CONSTANTS.USERS.length = 0
        res.render('home/index')
    }
}

const updateAccount = (req, res) => {
    homeDAO.updateAccount(req.body)
    .then( result => {
        console.log('res = ', result)
        res.redirect('/')
    })
    .catch( err => {
        console.log('ERROR:', err)
        res.redirect('/')
    })
}

module.exports = {
    renderPage,
    updateAccount
}