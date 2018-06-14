const { pool } = require('../connection_mysql')
const md5 = require('md5')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const doLogin = body => {
    let sql = 'select * from caduser1 where email = ?'
    return pool.query(sql, [body.email])
    .then(result => {
        let [row, field] = result
        if(row.length === 0) {
            return {
                message:'user not found'
            }
        } else {
            if(row[0].PASSWORD !== md5(CONSTANTS.SECRET_KEYBOARD.concat(body.password))) {
                return { message:'fail to auth' }
            } else if(!row[0].PERMITION) {
                return {message: 'not authorization'}
            } else {
                return {
                    user: {
                        name: row[0].NOME,
                        role: row[0].ROLE,
                        id: row[0].COD,
                        email: row[0].EMAIL
                    },
                    message:'auth/ok'
                }
            }
        }
    })
    .catch( err => {
        return err
    })
}

module.exports = {
    doLogin
}