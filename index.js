const express = require('express')
const app = express()
const port = process.env.Port || 12000
const routerAutentication = require('./Routers/autenticacao')


app.set('view engine', 'ejs')
app.use('/',routerAutentication)

app.listen(port,resp=>{
    console.log("Server listen on port", port)
})