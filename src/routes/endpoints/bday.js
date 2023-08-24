const bdayGet = require("../../../Requirerments/functions/bday/bdayGet");
const {
  latest,
  versions,
  ALLVersions,
} = require("../../../Requirerments/version");

const router = require("express").Router();
var { expressjwt: jwt } = require("express-jwt");

let version = latest;

/**
 * @swagger
 * /birthday:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       [Fun]
 *     summary: gets a random bday gif and text..
 *     description: gets a random bday gif and text..
 *     consumes:
 *       — application/json
 *     parameters:
 *       - in: query
 *         name: versionOverride
 *         description: the version to use
 *         required: false
 *     responses:
 *       200:
 *         description: gets a random bday gif and text..
 */

router.get("/", async (req, res) => {
  //if (!req.authInfo.admin) return res.status(401).send({ error: "Not authorized" });
  let { versionOverride } = req.query;

  if (!versionOverride) versionOverride = latest; // if the versionOverride is not provided it changes it to the latest I will test it

  if (!ALLVersions.includes(versionOverride))
    return res.status(400).send({
      error:
        "The version you asked to use is not available or is not supported (check docs for supported urls)",
    });

  bdayGet(versionOverride, req, res);
});

module.exports = router;
