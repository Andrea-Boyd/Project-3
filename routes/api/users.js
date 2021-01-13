
const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controller/userController");
const User = require("../../models/users");
const { forwardAuthenticated } = require("../../config/auth");
var isAuth = require("../../config/auth").isAuth;



// Matches with "/api/users"
//router.route("/").get(userController.findAll);
//router.route("/").post(userController.create);
// router.route("/session")
//   .get(userController.session)
router
  .route("/")
  //.get(userController.login)
  .post(userController.register);

// router.route("/login").post(passport.authenticate("local"), (req, res) => {
//   console.log(req.user)
//   res.json(req.user)

// })

router.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if(!user) res.send("No User exists")
    else {
      req.login(user, err => {
        if (err) throw err;
        //res.send("Success!!!");
        res.json(req.user)
        console.log(req.user)
      })
    }
  })(req, res, next)
})

router.route("/logout").get((req, res) => {
  console.log("logging out")
  req.logout();
  res.sendStatus(200);
})



// Matches with "/api/users/:id"
router
  .route("/:username")
  .get(userController.findOne)
  .put(userController.updateGroup)
  .delete(userController.remove);

module.exports = router;
