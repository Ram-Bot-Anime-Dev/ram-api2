const { rem_version_one } = require("../Version/rem");

/**
 *
 * @param {Array} text
 * @param {Array} image
 * @param {Array} v
 * @returns {Promise<void>}
 * @constructor
 */
async function RemSetArrays(text, image, v) {
  switch (v) {
    case "1":
      rem_version_one.imageUpdateArray.forEach((item) => {
        image.push(item);
      });

      break;
  }
}

module.exports = { RemSetArrays };
