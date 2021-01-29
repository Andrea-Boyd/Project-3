module.exports.isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};
