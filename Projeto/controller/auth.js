const userDAO = require('../model/createAccount/createAccountDAO')

const verifyPassword = (req, res) => {
    userDAO.verifyPassword(req.body.password)
    .then( result => {
        if(result && result[0].length === 0 ) {
            res.status(401).send({message:'password wrong'})
        } else {
            res.status(200).end()
        }
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.status(500).end()
    })
}

module.exports = {
    verifyPassword
}