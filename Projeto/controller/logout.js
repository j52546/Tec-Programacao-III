const logout = (req, res) => {
    if('user' in req.session) {
        req.session.destroy()
    }

    res.redirect('/login')
}

module.exports = {
    logout
}