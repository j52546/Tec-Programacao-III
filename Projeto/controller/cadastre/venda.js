const productDAO = require('../../model/product/productDAO')
const clientDAO = require('../../model/client/clientDAO')
const CONSTANTS = require('../../util/CONSTANTS.JS')
const userDAO = require('../../model/home/index')
const vendaDAO = require('../../model/venda/vendaDAO')
let users = new Array()

const renderPage = (req, res) => {
    if(CONSTANTS.ROLES.MANAGER.toUpperCase() === req.session.user.role.toUpperCase()) {
        userDAO.getAccountDontAuthorizated()
        .then(result => {
            if(result && result[0].length > 0) {
                users = result[0]
                res.locals.users = users
            }
            res.render('cadastre/venda')
        })
        .catch( err => {
            res.redirect('/')
        })       
    } else {
        res.render('cadastre/venda')
    }
}

const findClientAndProduct = (req, res) => {
    clientDAO.findClientById(req.body.id_client)
    .then( client => {
        productDAO.findProductById(req.body.id_prod)
        .then( prod => {
            if(client && client[0].length > 0) {
                if(prod && prod[0].length > 0) {
                    let [rowClient] = client[0], [rowProduct] = prod[0]
                    res.status(200).send({
                        id_client: rowClient.COD,
                        name_client: rowClient.NOME,
                        email_client: rowClient.EMAIL,
                        id_prod: rowProduct.COD,
                        name_prod:rowProduct.NOME,
                        desc_prod:rowProduct.DESCR,
                        preco_prod:rowProduct.PRECO_VENDA.toFixed(2),
                        qtd_prod: rowProduct.SALDO
                    })
                } else res.send({prodNotFound:true})
            } else res.send({clientNotFound:true})
        })
    })
}

const doSell = (req, res) => {
    vendaDAO.saveSell(req.body.content)
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
    findClientAndProduct,
    findClientAndProduct,
    doSell
}