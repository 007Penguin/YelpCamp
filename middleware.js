module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'YOU MUST BE SIGNED IN');
        return res.redirect('/login');
    }
    next()
}

