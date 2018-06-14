const CONSTANTS = require('../util/CONSTANTS.JS')
const users = new Array()
const approveDAO = require('../model/approvedItems/approveItemsDAO')

const renderPageSales = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }
    approveDAO.getAllSales()
    .then( sales => {
        let [row] = sales
        res.render('approve/sales', {sales: row})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
    
}

const getItemsById = (req, res) => {
    approveDAO.getItemSellById(req.body.id)
    .then( items => {
        res.status(200).send(items[0])
    })
    .catch( err => {
        console.log('ERROR: ', err) 
        res.status(500).send({error:'fail'})
    })
}

const renderPagePurchases = (req, res) => {
    if(CONSTANTS.USERS.length > 0) {
        res.locals.users = CONSTANTS.USERS
    }

    approveDAO.getAllPurchases()
    .then(purchases=>{
        let [row] = purchases
        res.render('approve/purchases', {purchases:row})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.redirect('/')
    })
  
 }

const approveSale = (req, res) => {
    approveDAO.approveItemById(parseInt(req.body.item[0]), parseInt(req.body.item[7]))
    .then(()=>{
        res.status(200).send({operation:'done'})
    })
    .catch(err=>{
        console.log('ERROR: ', err)
        res.status(500).send({operation:'fail'})
    })
}

const findPurchasesById = (req, res) => {
    approveDAO.findPurchasesById(req.body.id)
    .then( items => {
        res.status(200).send(items[0])
    })
    .catch( err => {
        res.status(500).send({error:'fail'})
    })
}

const approvePurchases = (req, res) => {
    approveDAO.approvePurchase(req.body.item[0], req.body.item[6])
    .then(()=>{
        res.status(200).send({operation:'done'})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.status(500).send({operation:'fail'})
    })
}


module.exports = {
    renderPageSales,
    renderPagePurchases,
    getItemsById,
    approveSale,
    findPurchasesById,
    approvePurchases
}