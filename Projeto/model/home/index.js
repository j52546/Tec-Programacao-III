const {pool} = require('../connection_mysql')

const getAccountDontAuthorizated = () => {
    let sql = 'select * from caduser1 where permition = 0'
    return pool.execute(sql)
    .then(result => {
        return result
    })
    .catch( err => {
        throw new Error('error to get user with account without permition '+err)
    })
}

const updateAccount = async user => {
    let sql = 'update caduser1 set permition = 1, role = ? where cod = ?'
    const connection = await pool.getConnection()
    return connection.execute(sql, [user.ROLE, user.COD])
    .then(result=>result)
    .catch(error=> { 
        connection.rollback()
        throw new Error(error) 
    })
}

module.exports = {
    getAccountDontAuthorizated,
    updateAccount
}