const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/users");

passport.use(new localStrategy(
    {
        usernameField: "email"
    },
    function (email, password, done) {
        console.log(email, password)
        User.findOne({

            email: email

        }, function (err, user) {
            if (err) throw err
            console.log(user)
            if (!user) {
                return done(null, false, {
                    message: "Incorrect Email."
                });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                // If there is a user with the given email, but the password the user gives us is incorrect
                if (!result) {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
                // If none of the above, return the user
                return done(null, user);
            });

            

        });
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

module.exports = passport;