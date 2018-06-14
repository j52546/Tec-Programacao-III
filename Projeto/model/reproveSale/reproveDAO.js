const {pool} = require('../connection_mysql')

const reproveSale = async id => {
    let sql = 'update conrec set recebido = -1, data_ped = ? where id = ?'
    let connection = await pool.getConnection()
    return connection.execute(sql, [new Date(), id])
    .then(() => {
        connection.commit()
        connection.release()
    })
    .catch(err=>{
        connection.rollback()
        throw err
    })
}

const reprovePurchase = id => {
    return pool.getConnection()
    .then( conn => {
        let sql = 'update conpagar set pago = -1, datpagamento = ? where id = ?'
        return conn.execute(sql, [new Date(), id])
        .then(()=>{
            conn.commit()
            conn.release()
        })
        .catch( err => {
            throw new Error(err)
        })
    })
}

module.exports = {
    reproveSale,
    reprovePurchase
}