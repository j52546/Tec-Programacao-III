const clientDAO = require('../model/client/clientDAO')


const allClients = (req, res) => {
    clientDAO.getClients()
    .then(clients => {
        let allClients = new Array()
        if(clients && clients[0].length > 0) {
            clients[0].map(client=>{
                allClients.push({
                    id: client.COD,
                    name: client.NOME,
                    email: client.email,
                    phone: client.TEL,
                    person: client.PESSOA
                })
            })
        }
        res.send({operation:'done', content:allClients})
    })
    .catch( err => {
        console.log('ERROR: ', err)
        res.status(500).send({error:'failed'})
    })
}

module.exports = {
    allClients
}