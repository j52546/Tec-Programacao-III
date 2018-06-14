const {pool} = require('../connection_mysql')
const md5 = require('md5')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const checkAccount = email => {
    let sql = 'select * from caduser1 where email = ?'
    return pool.execute(sql, [email]).then(result => {
        if(result) {
            return {result, fields:result[0]}
        } else {
            return undefined
        }
    })
    .catch( err => {
        throw new Error('Error to find email', err)
    })
}

const checkId = id => {
    let sql = 'select * from caduser1 where COD = ?'
    return pool.execute(sql, [id])
    .then( res => {
        return res
    })
    .catch( err => {
        throw new Error('Error to find by COD', err)
    })
}

const updatePassword = async (password, id) => {
    let sql = 'update caduser1 set password = ? where COD = ?'
    let connection = await pool.getConnection()
    return connection.execute(sql, [md5(CONSTANTS.SECRET_KEYBOARD.concat(password)), id])
    .then(result => {
        connection.commit()
        return result
    })
    .catch( err => {
        connection.rollback()
        throw new Error('Error to update account', err)
    })

}

module.exports = {
    checkAccount,
    checkId,
    updatePassword
}