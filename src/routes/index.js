const router = require("express").Router();
var { expressjwt: jwt } = require("express-jwt");
const authenticateToken = require("../../Requirerments/apikeychecker");

router.use("/hello", authenticateToken, require("./endpoints/hello"));

router.use("/birthday", authenticateToken, require("./endpoints/bday"));

router.use("/users", require("./endpoints/token"));

router.use("/nekopara", authenticateToken, require("./endpoints/nekopara"));

module.exports = router;
