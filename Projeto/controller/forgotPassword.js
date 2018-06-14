const nodeMailer = require('nodemailer')
const fs = require('fs')
let html = fs.readFileSync(__dirname+'\\email.html').toString()
const CONSTANTS = require('../util/CONSTANTS.JS')
const forgotPasswordDAO = require('../model/forgotPassword/forgotPassword')
const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth: {
        user:'astrasoftware2018@gmail.com',
        pass:'Astra@123'
    }
})

const getMailOptions = (email, html) => {
    return {
        from:'astrasoftware2018@gmail.com',
        to:email,
        subject:'Recuperar Senha',
        html
    }
}

const forgotPassword = (req, res) => {
    res.render('auth/forgotPassword')
}

const callbackEmail = (err, info) => {
    if(err) {
        console.log('error to send email ', err)
    } else {
        console.log('ok, sent email ', info)
    }
}

const postPassword = (req, res) => {
   if(req.body.email && new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(req.body.email)) {
       forgotPasswordDAO.checkAccount(req.body.email)
       .then( result => {
           if(result && result.fields.length > 0) {
                let token = new Buffer(CONSTANTS.SECRET_ID.concat(result.fields[0].COD)).toString('base64')
                html = html.replace('href', `href='http://138.255.220.138:${CONSTANTS.PORT_ON_SERVER}/recuperar-senha/${token}'`)
                transporter.sendMail(getMailOptions(req.body.email, html), callbackEmail)
                res.locals.success = true
                res.render('auth/forgotPassword')
            } else {
                res.locals.errorForgotAccount = true
                res.render('auth/forgotPassword')
            }
        })
        .catch( err => {
            console.log('ERROR = ', err)
            res.redirect('/')
        })
   } else {
        res.redirect('/recuperar-senha')
   }
}

const recoverPasswordPage = (req, res) => {
    console.log(req.params.id)
    const id = new Buffer(req.params.id, 'base64').toString().replace(CONSTANTS.SECRET_ID, '')
    forgotPasswordDAO.checkId(id)
    .then(result => {
        if(result && result[0].length > 0) {
            res.render('auth/recoverPassword')
        } else {
            res.redirect('/*')
        }
    })
    .catch(err=>{
        console.log(err)
        res.redirect('/')
    })
}

const recoverPassword = (req, res) => {
    const id = new Buffer(req.params.id, 'base64').toString().replace(CONSTANTS.SECRET_ID, '')
    forgotPasswordDAO.updatePassword(req.body.password, id)
    .then( result => {
        res.locals.successToChangePassword = true
        res.render('auth/recoverPassword')
    })
    .catch( err => {
        console.log('error', err)
        res.redirect('/404')
    })
}

module.exports = {
    forgotPassword,
    postPassword,
    recoverPasswordPage,
    recoverPassword
}