const { ram_version_one } = require("../Version/ram");

/**
 *
 * @param {Array} text
 * @param {Array} image
 * @param {Array} v
 * @returns {Promise<void>}
 * @constructor
 */
async function RamSetArrays(text, image, v) {
  switch (v) {
    case "1":
      ram_version_one.imageUpdateArray.forEach((item) => {
        image.push(item);
      });

      break;
  }
}

module.exports = { RamSetArrays };
