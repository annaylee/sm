// Protect the dashboard page from being accessed by unauthenticated users.
// For any route we want to protect, just add 'ensureAuthenticated' middleware.

module.exports = {

    ensureAuthenticated: function(req, res, next){

        if (req.isAuthenticated()){ return next(); }
        req.flash('error', 'Please login to view this page');
        res.redirect('/login');
    }
}

