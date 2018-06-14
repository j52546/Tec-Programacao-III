const reproveDAO = require('../model/reproveSale/reproveDAO')

const reproveSale = (req, res) => {
    reproveDAO.reproveSale(parseInt(req.body.item[0]))
    .then(()=>{
        res.status(200).send({operation:'done'})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.status(500).send({operation:'fail'})
    })
}

const reprovePurchase = (req, res) => {
    reproveDAO.reprovePurchase(req.body.item[0])
    .then(()=>{
        res.status(200).send({operation:'done'})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.status(500).send({operation:'fail'})
    })
}

module.exports = {
    reproveSale,
    reprovePurchase
}