const {pool} = require('../connection_mysql')

const saveSell = async body => {
    let connection = await pool.getConnection()
    let result = undefined
    return connection.beginTransaction()
    .then(() => {
        result = body.map( values => {
            let sql = 'insert into cabpedven (CADCLIN1_COD, NOMECLI, TOTAL_PED) VALUES '
            sql = sql.concat('(?,?,?)')
            return connection.execute(sql, [values.id_client, values.name_client, values.items.length])
            .then( result => {
                let total = values.items.map(v=>v.total).reduce((a,b)=>Number(a)+Number(b), 0)
                return saveContas(connection, total, result[0].insertId).then(() => {
                   return values.items.map( content => {
                        let sqlItem =  'insert into itepedven (CABPED_COD, CADPROD1_COD, QTD, PREC, TOTAL) values '
                        sqlItem = sqlItem.concat('(?,?,?,?,?)')
                        return connection.execute(sqlItem, [result[0].insertId, content.id_prod, content.qtd, content.preco, content.preco*content.qtd])
                        .catch(err => {
                            connection.rollback()
                        })
                    })
                })
                .catch( err => {
                    connection.rollback()
                    throw err
                })
            })
            .catch( err => {
                connection.rollback()
                throw {err}
            })
            
        })
        let res = new Array()
        return Promise.all(result)
        .then((resultAll) => {
           resultAll.map(v=>v.map(c=>res.push(c)))
            return Promise.all(res)
            .then((r)=>{
                connection.commit()
                connection.release()
            })
            .catch( err => {


                connection.roolback()
                throw err
            })
        })
        .catch( err => {
            console.log(err)
            connection.rollback()
            throw {err}
        })
    })
}

function saveContas(conn, tot, insertId) {
    let dateVencimento = getDateVencimento()
    let datePedido = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate()
    let sql = 'insert into conrec (DATVENCIM, VALOR, DATA_PED, RECEBIDO, CABPEDVEN_COD ) values '
    sql = sql.concat('(?,?,?,?,?)')
    return conn.execute(sql, [dateVencimento, tot, datePedido, 0, insertId])
}

function getDateVencimento() {
    let dateVencimento = new Date()
    dateVencimento.setDate(dateVencimento.getDate()+30)
    return dateVencimento.getFullYear()+'/'+(dateVencimento.getMonth()+1)+'/'+dateVencimento.getDate()
    
}

module.exports = {
    saveSell
}