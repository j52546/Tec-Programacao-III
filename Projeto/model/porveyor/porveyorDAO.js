const {pool} = require('../connection_mysql')

const savePurveyor = async porveyor => {
    let { nome, pessoa, doc, email, telefone, endereco, cidade, estado, cep } = porveyor
    let sql = 'insert into cadfornec1 (NOME, PESSOA, DOCIND, EMAIL, TEL, END, CIDADE, ESTADO, CEP)'
    sql = sql.concat(' VALUES (?,?,?,?,?,?,?,?,?)')
    let connection = await pool.getConnection()
    return connection.execute(sql, [nome, pessoa, doc, email, telefone, endereco, cidade, estado, cep])
    .then(result=>result)
    .catch(err=>{
        connection.rollback()
        throw {code: err.code}
    })
}

const getPurveyors = () => {
    let sql = 'select * from cadfornec1'
    return pool.execute(sql)
    .then(result=>result)
    .catch(error=>error)
}

const findPurveyor = ({id_fornec}) => pool.execute('select * from cadfornec1 where cod = ?', [id_fornec])

module.exports = {
    savePurveyor,
    getPurveyors,
    findPurveyor
}