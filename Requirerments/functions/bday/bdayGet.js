const { outdated } = require("../../version");
const { request, response } = require('express');

/**
 * 
 * @param {String} version 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */

async function helloGet(version, req, res) {
    if (outdated.includes(version)) return res.status(400).send({ error: `${version} is outdated and no longer works` });

    if (version.startsWith('v')) version = version.replace("v", ""); // makes it a number string ex: "1"
    let textarray = []; //the array
    let imagearray = [];

    //! newer updates will contain the same code just new items in each array

    switch (version) { // uses the proper version
        case "1": 
            let textupdateArray = [
                `Wishing you the best birthday ever!`,
                `Wishing you the best birthday ever!`,
                `Happy Birthday, Hope your birthday is amazing!`,
                "Happy Birthday!",
            ];
            let imageupdateArray = [
                "https://rambot.xyz/ram-api2-images/bday/bday1.gif",
                "https://rambot.xyz/ram-api2-images/bday/bday2.gif",
                "https://rambot.xyz/ram-api2-images/bday/bday3.gif",
                "https://rambot.xyz/ram-api2-images/bday/bday4.gif"

            ];


            textupdateArray.forEach(item => {
                textarray.push(item);
            })
            imageupdateArray.forEach(item => {
                imagearray.push(item);
            })

        break;
    }
    const index = Math.floor(Math.random() * (textarray.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    const index2 = Math.floor(Math.random() * (imagearray.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).

    res.send({ text: textarray[index], imageURL: imagearray[index2] });
}

module.exports = helloGet
