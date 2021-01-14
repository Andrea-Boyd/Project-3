const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
var isAuth = require("../config/auth").isAuth;

router.use("/api", apiRoutes);

//new code
// router.use("/", function(req, res) {
//   if (req.user) {
//     res.
//   }
// })
//end of new code

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// router.use("/user", isAuth, function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
