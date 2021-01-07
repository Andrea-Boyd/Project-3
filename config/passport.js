const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/users");
const passport = require("passport");

module.exports = function(passport) {
    passport.use(
        new localStrategy({ usernameField: "email"}, (email, password, done) => {
            // match user
            User.findOne({ email: email})
            .then(user => {
                if(!user) {
                    return done(null, false, { msg: "That email is not registered"});
                }

                // match the password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, false, { message: "Password Incorrect "})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
}

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})