const {pool} = require('../connection_mysql')

function getAllSales(){
    let sql = `select c.ID, c.DATVENCIM, c.DATA_PED, clin.NOME, cb.TOTAL_PED, c.VALOR, cb.COD from conrec as c 
               join cabpedven as cb on cb.COD = c.CABPEDVEN_COD
               join cadclin1 as clin on clin.COD = cb.CADCLIN1_COD
               where c.RECEBIDO = 0`
    return pool.execute(sql)           
}

function getItemSellById(id) {
    let sql = `select prod.COD, prod.NOME, prod.PRECO_VENDA, i.QTD, prod.DESCR, prod.SALDO from itepedven as i
               join cadprod1 as prod on i.CADPROD1_COD = prod.COD
               where i.CABPED_COD = ?`
    return pool.execute(sql, [id])
}

async function approveItemById(id_ven, cod_cab) {
    let connection = await pool.getConnection()
    return connection.beginTransaction()
    .then(_=>{
        let sqlUpdateSellToApproved = 'update conrec set recebido = 1 where id = ?'
        return connection.execute(sqlUpdateSellToApproved, [id_ven])
        .then(()=>{
           return findItems(connection, cod_cab)
            .then(items=>{
                let [row] = items
                if(row.length > 0) {
                   let products = row.map(content => {
                      return connection.execute('select * from cadprod1 where cod = ?', [content.COD])
                       .then(prod => {
                            let [product] = prod
                            return {id: product[0].COD, saldo: product[0].SALDO, qtd: content.QTD}
                       })
                       .catch( err => {
                           connection.rollback()
                           throw err    
                       })
                    })
                    return Promise.all(products)
                    .then(result => {
                        let ids = result.filter((v, index)=>result.map(c=>c.id).indexOf(v.id)==index)
                        return ids.map(value => {
                            let tot = value.saldo - result.filter(c=>c.id===value.id).map(c=>c.qtd).reduce((a,b)=>a+b,0)
                            let sql = 'update cadprod1 set saldo = ? where cod = ?'
                            connection.execute(sql, [tot, value.id])
                            .then(()=>{
                                connection.commit()
                                connection.release()
                            })
                            .catch(err=>{
                                connection.rollback()
                                throw err
                            })
                       })
                    })
                    .catch( err => {
                        connection.rollback()
                        throw err
                    })

                } else {
                    connection.rollback()
                    throw err
                }
            })
            .catch(err=>{
                connection.rollback()
                throw err
            })
        })
        .catch(err=>{
            connection.rollback()
            throw err
        })
    })
    .catch(err=>{
        connection.rollback()
        throw err
     })
}

function findItems(connection, id) {
    let sqlFindItems = `select prod.COD, prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedven as i
    join cadprod1 as prod on i.CADPROD1_COD = prod.COD
    where i.CABPED_COD = ?`
    return connection.execute(sqlFindItems, [id])
}

function getAllPurchases() {
    let sql = `select p.ID, p.DATVENCIM as data_vencimento, c.NOMEFORNEC as nome_fornecedor, c.TOTAL_PED as total_ped, p.VALOR as valor, c.COD
    from conpagar as p join cabpedcomp as c
    on p.CABPEDCOMP_COD = c.COD where p.PAGO = 0`
    return pool.execute(sql)

}

function findPurchasesById(id) {
    let sql = `select prod.COD, prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedcomp as i
    join cadprod1 as prod on i.CADPROD1_COD = prod.COD
    where i.CABPEDCOMP_COD = ?`
    return pool.execute(sql, [id])
}

function findItemsPurchases(connection, id) {
    let sqlFindItems = `select prod.COD, prod.NOME, prod.PRECO, i.QTD, prod.DESCR, prod.SALDO from itepedcomp as i
    join cadprod1 as prod on i.CADPROD1_COD = prod.COD
    where i.CABPEDCOMP_COD = ?`
    return connection.execute(sqlFindItems, [id])
}

async function approvePurchase(id_comp, id_cab) {
    let sqlUpdatePurchase = 'update conpagar set pago = 1, datpagamento = ? where id = ?'
    let sqlFindItems = 'select * from cadprod1 where cod = ?'
    let sqlUpdateProd = 'update cadprod1 set saldo = ? where cod = ?'
    let connection = await pool.getConnection()
    try {
        await connection.beginTransaction()
        await connection.execute(sqlUpdatePurchase, [new Date(), id_comp])
        let [items] = await findItemsPurchases(connection, id_cab)
        let item = items.map(async content=>{
            let prod = await connection.execute(sqlFindItems, [content.COD])
            let [product] = prod
            return {id: product[0].COD, saldo: product[0].SALDO, qtd: content.QTD}
        })

        let result = await Promise.all(item)
        let ids = result.filter((v, index)=>result.map(c=>c.id).indexOf(v.id)==index)
        ids.map(async value => {
            let tot = value.saldo + result.filter(c=>c.id===value.id).map(c=>c.qtd).reduce((a,b)=>a+b,0)
            let sql = 'update cadprod1 set saldo = ? where cod = ?'
            await connection.execute(sql, [tot, value.id])
            connection.commit()
            connection.release()
       })

    } catch (error) {
        connection.rollback()
        throw error
    }

}

module.exports = {
    getAllSales,
    getItemSellById,
    approveItemById,
    getAllPurchases,
    findPurchasesById,
    approvePurchase
}
