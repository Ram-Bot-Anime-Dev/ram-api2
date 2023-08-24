const {hello_version_one} = require("../Version/hello");

/**
 *
 * @param {Array} text
 * @param {Array} image
 * @param {Array} v
 * @returns {Promise<void>}
 * @constructor
 */
async function HelloSetArrays(text, image, v) {
    switch (v){
        case "1":

            hello_version_one.textupdateArray.forEach(item => {
                text.push(item);
            })

            hello_version_one.imageupdateArray.forEach(item => {
                image.push((item));
            })

            break;
    }
}

module.exports = {HelloSetArrays}