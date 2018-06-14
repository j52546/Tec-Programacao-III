const { pool } = require('../connection_mysql')

const saveCompra =  async body => {
    let connection = await pool.getConnection()
    let result = undefined
    return connection.beginTransaction()
    .then(() => {
        result = body.map( values => {
            let sql = 'insert into cabpedcomp (NOMEFORNEC, TOTAL_PED, CADFORNEC_COD) VALUES '
            sql = sql.concat('(?,?,?)')
            return connection.execute(sql, [values.items[0].name_fornec, values.items.length, parseInt(values.id_fornec)])
            .then( result => {
                let total = values.items.map(v=>v.total).reduce((a,b)=>Number(a)+Number(b), 0)
                return saveContas(connection, total, result[0].insertId).then(() => {
                   return values.items.map( content => {
                        let sqlItem =  'insert into itepedcomp (QTD, PREC, TOTAL, CABPEDCOMP_COD, CADPROD1_COD) values '
                        sqlItem = sqlItem.concat('(?,?,?,?,?)')
                        return connection.execute(sqlItem, [content.qtd, content.preco, content.preco*content.qtd, result[0].insertId, parseInt(content.id_prod)])
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

const findProductById = id => pool.execute('select * from cadprod1 where cod = ?', [id])

function saveContas(conn, tot, insertId) {
    let dateVencimento = getDateVencimento()
    let sql = 'insert into conpagar (datvencim  , valor, pago, datpagamento, cabpedcomp_cod ) values '
    sql = sql.concat('(?,?,?,?,?)')
    return conn.execute(sql, [dateVencimento, tot, 0, null, insertId])
}

function getDateVencimento() {
    let dateVencimento = new Date()
    dateVencimento.setDate(dateVencimento.getDate()+30)
    return dateVencimento.getFullYear()+'/'+(dateVencimento.getMonth()+1)+'/'+dateVencimento.getDate()
    
}

function saveNewProduct(produto) {
    let sql = 'insert into cadprod1 (NOME, DESCR, SALDO, PRECO, PRECO_VENDA) values '
    sql = sql.concat('(?,?,?,?,?)')
    return pool.execute(sql, [produto.nome, produto.descricao, 0, produto.preco, parseFloat((produto.preco*1.3).toFixed(2))])
}

function getProductsEnter(){
    let sql = `select prod.COD, prod.NOME, sum(i.QTD) as quantidade, prod.SALDO from conpagar as con
    join cabpedcomp as cab on cab.COD = con.CABPEDCOMP_COD
    join itepedcomp as i on i.CABPEDCOMP_COD = cab.COD
    join cadprod1 as prod on prod.COD = i.CADPROD1_COD
    where con.PAGO = 0 group by prod.NOME`
    return pool.execute(sql)
}

function getProductsExit() {
    let sql = `select prod.COD, prod.NOME, sum(i.QTD) as quantidade, prod.SALDO from conrec as con
    join cabpedven as c on c.COD = con.ID
    join itepedven as i on c.COD = i.CABPED_COD
    join cadprod1 as prod on prod.COD = i.CADPROD1_COD
    where con.RECEBIDO = 0 group by prod.NOME`
    return pool.execute(sql)
}

function getReportsProduct(){
    let sql = `select p.COD as codigo, p.NOME as nome, p.DESCR as descricao, p.PRECO as preco, p.PRECO_VENDA as preco_venda,
    p.SALDO as saldo, sum(i.QTD) as quantidade, sum(i.TOTAL) as renda_final from conrec as cn
   join cabpedven as c on c.COD = cn.CABPEDVEN_COD
   join itepedven as i on i.CABPED_COD = c.COD
   join cadprod1 as p on p.COD = i.CADPROD1_COD
   where cn.RECEBIDO = 1
   group by p.COD`
   return pool.execute(sql)
}

function getFiveProductsMoreSale(fieldOrder){
    let sql = `select p.COD as codigo, p.NOME as nome, p.DESCR as descricao, p.PRECO_VENDA as preco,
    p.SALDO as saldo, sum(i.QTD) as quantidade, sum(i.TOTAL) as renda_final from conrec as cn
   join cabpedven as c on c.COD = cn.CABPEDVEN_COD
   join itepedven as i on i.CABPED_COD = c.COD
   join cadprod1 as p on p.COD = i.CADPROD1_COD
   where cn.RECEBIDO = 1
   group by p.COD
   order by ${fieldOrder} desc
    limit 5`
    return pool.execute(sql)
}

const getProducts = () => pool.execute('select * from cadprod1')


module.exports = {
    saveCompra,
    findProductById,
    saveNewProduct,
    getProducts,
    getProductsEnter,
    getProductsExit,
    getReportsProduct,
    getFiveProductsMoreSale
}