const db = require("../models")

module.exports = {
    ensureAuthenicated: function(req, res, next) {
        if (req.isAuthenicated()) {
            return next();
        }
        req.flash("error_msg", "Please log in to view that resource");
        req.redirect("/login");
    },
    forwardAuthenicated: function(req, res, next) {
        if (!req.isAuthenicated()) {
            return next();
        }
        res.redirect("/login");
    },

    
}