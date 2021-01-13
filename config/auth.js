
// module.exports = function(req, res, next) {
//     // If the user is logged in, continue with the request to the restricted route
//     if (req.user) {
//       return next();
//     }
  
//     // If the user isn't logged in, redirect them to the login page
//     return res.redirect("/");
//   };
  
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: "Not Auth"})
    }
}