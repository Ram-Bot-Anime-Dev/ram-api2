const jwt = require("jsonwebtoken");
const apikeys = require("../../../Requirerments/Scemas/apikeys");
const bcrypt = require("bcrypt");
const authenticateToken = require("../../../Requirerments/apikeychecker");

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       [Account]
 *     summary: get a token 1 per email.
 *     description: get a token 1 per email.
 *     consumes:
 *       — application/json
 *       - application/xml
 *     requestBody:
 *       description: A JSON object containing category information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: get a token 1 per email.
 */
const router = require("express").Router();


router.post("/signup", async (req, res) => {
    let { email, password, account } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'email and pass missing in body {"email": "email@email.com", "password": "Password1234!"}' })

    apikeys.User.create({
        email,
        password: bcrypt.hashSync(password, 10),
    }).then((user) => {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.se, { expiresIn: "259200s" });
        res.json({ success: true, token, expires: "In 3 Days" });
    }).catch(err => {
        res.json({ success: false, error: err });
    })
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       [Account]
 *     summary: Re sign in.
 *     description: re Sign in.
 *     consumes:
 *       — application/json
 *       - application/xml
 *     requestBody:
 *       description: A JSON object containing category information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: get a token 1 per email.
 */

router.post("/login", async (req, res) => {
    let { email, password, account } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'email and pass missing in body {"email": "email@email.com", "password": "Password1234!"}' })

    apikeys.User.findOne({ email }).then((user) => {
        if (!user) {
            res.json({ success: false, error: "User never signed up" });

        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                res.json({ success: false, error: 'wrong password' });
            } else {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.se, { expiresIn: "3D" });
                res.json({ success: true, token, expires: "In 3 Days" });
            }
        }
    }).catch(err => {
        res.json({ success: false, error: err });
    });


})







module.exports = router;