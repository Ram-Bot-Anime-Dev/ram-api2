
const prokeys = require("./Scemas/apikeys");


const validateToken = async (req, res, next) => {
    //Where is the API key expected to be?
    let host = req.headers.origin;

    //let api_key = req.query.api_key; //version 1 with the querystring
    //let api_key = req.params.apikey; //version 2 with the URL params
    let api_key = req.header("token"); //version 3 using a header
    //version 3 using a header
    if (!api_key)
        return res.status(403).send({
            error: {
                code: 403,
                message:
                    "You Must provide the token (api-key) to get one join https://discord.gg/s5SmhGYTSZ and request one in #request-a-key",
            },
        });

    const data = await prokeys.findOne({ _id: api_key });



    // find() returns an object or undefined
    if (data) {
        let account = {
            email: data.email,
            api_key: data._id,
        };
        let key2 = account.api_key;
        if (key2 !== api_key)
            return res.status(403).send({
                error: {
                    code: 403,
                    message:
                        "You Must provide the token (api-key) to get one join https://discord.gg/s5SmhGYTSZ and request one in #request-a-key",
                },
            });

        next();

    } else {
        //stop and respond
        res.status(403).send({
            error: {
                code: 403,
                message:
                    "You Must provide the token (api-key) to get one join https://discord.gg/s5SmhGYTSZ and request one in #request-a-key",
            },
        });
    }
};

module.exports = validateToken;