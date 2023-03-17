const helloGet = require("../../../Requirerments/functions/helloGet");
const { latest, versions } = require("../../../Requirerments/version");

const router = require("express").Router();
var { expressjwt: jwt } = require("express-jwt");

let version = latest;

/**
 * @swagger
 * /hello:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       [Fun]
 *     summary: This should get you a random answer.
 *     description: gets a random answer.
 *     consumes:
 *       — application/json
 *     parameters:
 *       - in: query
 *         name: versionOverride
 *         description: the version to use
 *         required: false
 *     responses:
 *       200:
 *         description: random answer.
 */


router.get("/", async (req, res) => {
    //if (!req.authInfo.admin) return res.status(401).send({ error: "Not authorized" });
    let { versionOverride } = req.query;

    if (!versionOverride) versionOverride = latest; // if the versionOverride is not provided it changes it to the latest I will test it

    if (!versions.includes(versionOverride)) return res.status(400).send({ error: "The version you asked to use is not available or is not supported (check docs for supported urls)" })

    helloGet(versionOverride, req, res);

})

module.exports = router;