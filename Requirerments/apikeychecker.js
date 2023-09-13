
const prokeys = require("./Scemas/apikeys");
let jsonwebtoken = require("jsonwebtoken");

function checkToken(req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]
            let authorization = req.headers.authorization
            let decoded
            try {
                decoded = jsonwebtoken.verify(token, process.env.se);
            } catch (e) {
                reject("Token not valid");
            }
            let userId = decoded.id
            prokeys.User.findOne({ _id: userId }).then(user => {
                resolve(user)
            }).catch(err => {
                reject("Token error")
            })
        } else {
            reject("No token found")
        }
    })
}

function authenticateToken(req, res, next) {
    checkToken(req).then(user => {
        next()
    }).catch(err => {
        console.log(err)
        res.status(403).send({error: "Token invalid or not provided"});
    })
}

module.exports = authenticateToken;
