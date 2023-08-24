const { nekopara_version_one } = require("../Version/nekopara");

/**
 *
 * @param {Array} text
 * @param {Array} image
 * @param {Array} v
 * @returns {Promise<void>}
 * @constructor
 */
async function nekoparaSetArrays(image, v) {
  switch (v) {
    case "1":
      nekopara_version_one.imageupdateArray.forEach((item) => {
        image.push(item);
      });

      break;
  }
}
module.exports = { nekoparaSetArrays };
