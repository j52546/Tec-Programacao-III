const {pool} = require('../connection_mysql')
const md5 = require('md5')
const CONSTANTS = require('../../util/CONSTANTS.JS')

const createAccount = async body => {
    let { name, lastName, cpf, telephone, password, email } = body
    let sql = `insert into caduser1 (nome, docind, tel,email, password, permition) values (?,?,?,?,?,?)`
    let connection = await pool.getConnection()
    return connection.execute(sql, [name.concat(' ').concat(lastName), cpf, telephone, email, md5(CONSTANTS.SECRET_KEYBOARD.concat(password)), 0])
        .then(result => {
            connection.commit()
            return result
        })  
        .catch( err => {
            connection.rollback()
            return err
        })
}

const verifyPassword = password => pool.execute('select * from caduser1 where password = ?', [md5(CONSTANTS.SECRET_KEYBOARD.concat(password))])
const updateUser = async (user, id) => {
    const sql = 'update caduser1 set nome = ?, email = ?, password = ? where COD = ?'
    const connection = await pool.getConnection()
    try {
        return await connection.execute(sql, [user.name, user.email, md5(CONSTANTS.SECRET_KEYBOARD.concat(user.password)), id])
    } catch (error) {
        throw error
    }
}

module.exports = {
    createAccount,
    verifyPassword,
    updateUser
}