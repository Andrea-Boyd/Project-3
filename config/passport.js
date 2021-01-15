const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("../models");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      console.log(email, password);
      db.User.findOne(
        {
          email: email,
        },
        function (err, user) {
          if (err) throw err;
          console.log(user);
          if (!user) {
            console.log("localStrategy");
            return done(null, false, {
              message: "Incorrect Email.",
            });
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              console.log("pass!!!!!:", user.password);
              // If there is a user with the given email, but the password the user gives us is incorrect
              if (!result) {
                return done(null, false, {
                  message: "Incorrect password.",
                });
              }
              // If none of the above, return the user
              console.log("validUser");
              return done(null, user);
            });
          }
        }
      );
    }
  )
);
passport.serializeUser((user, cb) => {
  //console.log("serUser: " , user)
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  //console.log("done: ", obj)
  cb(null, obj);
});

module.exports = passport;
