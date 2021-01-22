const router = require("express").Router();
const passport = require("../../config/passport");
const userController = require("../../controller/userController");
const User = require("../../models/users");
const { forwardAuthenticated } = require("../../config/auth");
var isAuth = require("../../config/auth").isAuth;

router.route("/").post(userController.register);

router.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User exists");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        //res.send("Success!!!");
        res.json(req.user);
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.route("/logout").get((req, res) => {
  console.log("logging out");
  req.logout();
  res.sendStatus(200);
});

router.route("/subgroup/:id").put(userController.addSubGroup);

// Matches with "/api/users/:id"
router
  .route("/:username")
  .get(isAuth, userController.findOne)
  .put(userController.updateGroup)
  .delete(userController.remove);

module.exports = router;
