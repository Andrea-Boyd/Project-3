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

    // register: async function (req, res) {
    //     try {
    //         // creates the hashedpasswords
    //         const hashedpasswords = await bcrypt.hash(req.body.password, 10)
    //         db.User.create({
    //             first_name: req.body.name,
    //             email: req.body.email,
    //             password: hashedPassword
    //         })
    //         .then(userData => {
    //             res.send({ user: userData.id, message: "Welcome!" })
    //         })
    //     } catch (err) {
    //         res.send(err)
    //     }
    // },

    // login: (req, res) => {
    //     db.User.findOne({
    //         where: {
    //             email: req.body.email
    //         }

    //     }).then(async function (userData) {
    //         if (!userData) {
    //             res.send({ user: false, message: "No user with that email"  })
    //             return
    //         }

    //         if (await bcrypt.compare(req.body.password, userData.password)) {
    //             res.send({ user: userData.id, message: "Welcome Back" })

    //         }else {
    //             res.send({ user: false, message: "Password Incorrect"})
    //         }


    //     }).catch(err => {
    //         res.send(err)
    //         console.log("We caught an error")
    //     })
    // }
}