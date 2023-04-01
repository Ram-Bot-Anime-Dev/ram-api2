const router = require("express").Router();
var { expressjwt: jwt } = require("express-jwt");
const authenticateToken = require("../../Requirerments/apikeychecker");

router.use("/hello", authenticateToken, require('./endpoints/hello'));

router.use("/users", require("./endpoints/token"));

module.exports = router;