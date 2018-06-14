const SECRET_KEYBOARD = 'password:'
let PORT_ON_SERVER = undefined
const SECRET_ID = 'id:'
const ROLES = {
    MANAGER:'Gerente',
    BUYER:'Comprador',
    SALESMAN:'Vendedor',
    FINANCIAL:'Financeiro',
    STOCK:'Estoque'
}
let USERS = new Array()

module.exports = {
    SECRET_KEYBOARD,
    PORT_ON_SERVER,
    SECRET_ID,
    ROLES,
    USERS
}