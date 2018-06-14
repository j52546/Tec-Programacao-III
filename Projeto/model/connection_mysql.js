const mysql = require('mysql2/promise')
const connection = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    database        : 'astrasoftware',
})

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'astrasoftware',
})

module.exports = {
    connection,
    pool
}