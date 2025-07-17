const { expressjwt: jwt } = require("express-jwt");

exports.requireSignin = jwt({
    secret: "ajbhjazzhbzkasjaj",
    algorithms: ["HS256"],
    requestProperty: 'auth'
});