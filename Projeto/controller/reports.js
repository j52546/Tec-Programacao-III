const CONSTANTS = require('../util/CONSTANTS.JS')
const reportsDAO = require('../model/report/reportDAO')
const productDAO = require('../model/product/productDAO')

const employeePage = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    reportsDAO.getAllEmployee()
    .then( result => {
        let [employees] = result
        res.render('reports/employees', {employees})
    })
    .catch(err=>{
        console.log('ERROR: ', err)
        res.redirect('/')
    })
}

const productsPage = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    productDAO.getReportsProduct()
    .then( result => {
        let [products] = result
        res.render('reports/productsSale', {products})
    })
    .catch(err=>{
        console.log('ERROR: ', err)
        res.redirect('/')
    })

}


module.exports = {
    employeePage,
    productsPage
}

