const {pool} = require('../connection_mysql')

const getAllEmployee = ()=>pool.execute('select * from caduser1')

module.exports = {
    getAllEmployee
}