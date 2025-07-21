const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});






exports.isAuth = (req, res, next) => {

  let user = req.profile && req.auth && (req.profile._id.toString() === req.auth._id);
  
  if (!user) {
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== 1) {
    return res.status(403).json({
      error: "Admin resource! Access denied"
    });
  }
  next();
};