const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});
