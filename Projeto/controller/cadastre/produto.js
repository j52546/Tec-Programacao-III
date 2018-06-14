const produtoDAO = require('../../model/product/productDAO')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const novoProduto = (req, res) => {
    produtoDAO.saveNewProduct(req.body)
    .then( produto => {
        res.send({operation:'done', id:produto[0].insertId})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.send({operation:'fail'})
    })
}

const getAllProducts = (req, res) => {
    produtoDAO.getProducts()
    .then( result => {
        if(result && result[0].length > 0) {
            res.send({operation:'done', content:result[0]})
        } else {
            res.send({operation:'done', content:new Array()})
        }
    })
    .catch( err => {
        console.log('ERR: ', err)
        res.send({operation:'fail'})
    })
}

const getAllProductsAndRender = (req, res) => {
    produtoDAO.getProducts()
    .then(result=>{
        res.locals.users = CONSTANTS.USERS
        if(result && result[0].length > 0) {
            res.render('lists/products', {products:result[0]})
        } else {
            res.render('lists/products', {products:new Array()})
        }
    })
    .catch(err=>{
        console.log('ERROR: ', err)
        res.redirect('/')
    })
}

const renderPageEntranceAndExit = (req, res) => {
    res.locals.users = CONSTANTS.USERS
    res.render('lists/entranceAndExit')
}

const getProductEnter = (req, res) => {
    res.set('Cache-Control', 'public, max-age=15')
    produtoDAO.getProductsEnter()
    .then(products=>{
        res.status(200).send({operation:'done', content:products[0]})
    })
    .catch(err=>{
        console.log('ERROR: ',  err)
        res.status(500).send({operation:'fail'})
    })
}

const getProductExit = (req, res) => {
    res.set('Cache-Control', 'public, max-age=60')
    produtoDAO.getProductsExit()
    .then(products=>{
        res.status(200).send({operation:'done', content:products[0]})
    })
    .catch(err=>{
        console.log('ERROR: ',  err)
        res.status(500).send({operation:'fail'})
    })
}

module.exports = {
    novoProduto,
    getAllProducts,
    getAllProductsAndRender,
    renderPageEntranceAndExit,
    getProductEnter,
    getProductExit
}