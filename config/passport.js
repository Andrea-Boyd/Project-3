const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/users");

passport.use(new localStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {

        User.findOne({
            where: {
                email: email
            }

        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: "Incorrect Email."
                });
            }

            else if (!user.validPassword(password)) {

                return done(null, false, {
                    message: "Incorrect password"
                });

            }
            return done(null, user)

        });
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

module.exports = passport;