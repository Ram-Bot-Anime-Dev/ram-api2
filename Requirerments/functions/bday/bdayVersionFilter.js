const {bday_version_one} = require("../Version/bday");

/**
 *
 * @param {Array} text
 * @param {Array} image
 * @param {Array} v
 * @returns {Promise<void>}
 * @constructor
 */
async function BdaySetArrays(text, image, v) {
    switch (v){
    case "1":
        bday_version_one.textupdateArray.forEach(item => {
            text.push(item);
        })

        bday_version_one.imageupdateArray.forEach(item => {
            image.push((item));
        })

        break;
    }
}
module.exports = {BdaySetArrays}