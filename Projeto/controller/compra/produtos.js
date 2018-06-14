const CONSTANTS = require('../../util/CONSTANTS.JS')
const userDAO = require('../../model/home/index')
let users = new Array()
const productDAO = require('../../model/product/productDAO')

const renderPage = (req, res) => {
    if(CONSTANTS.ROLES.MANAGER.toUpperCase() === req.session.user.role.toUpperCase()) {
        userDAO.getAccountDontAuthorizated()
        .then(result => {
            if(result && result[0].length > 0) {
                users = result[0]
                res.locals.users = users
            }
            res.render('compra/produto')
        })
        .catch( err => {
            console.log('ERROR: ', err)
            res.redirect('/')
        })       
    } else {
        res.render('compra/produto')
    }
}

const newProduct = (req, res) => {
    productDAO.saveCompra(req.body.content)
    .then( _ => {
        res.send({operation:'done'})
    })
    .catch( err => {
        console.log(err)
        res.send({operation:'fail'})
    })
}

module.exports = {
    renderPage,
    newProduct
}