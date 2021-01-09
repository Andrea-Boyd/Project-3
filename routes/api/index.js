const router = require("express").Router();
const userRoutes = require("./users");
const groupRoutes = require("./groups");


router.use("/groups", groupRoutes);
// User Routes
router.use("/users", userRoutes);

module.exports = router;
