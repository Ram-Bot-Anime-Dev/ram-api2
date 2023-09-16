const { outdated, versions } = require("../../version");
const { request, response } = require("express");
const { RamSetArrays } = require("./ramVersionFiller");

/**
 *
 * @param {String} version
 * @param {request} req
 * @param {response} res
 * @returns
 */

async function ramGet(version, req, res) {
  if (outdated.includes(version))
    return res
      .status(400)
      .send({ error: `${version} is outdated and no longer works` });

  if (version.startsWith("v")) version = version.replace("v", ""); // makes it a number string ex: "1"
  let textarray = []; //the array
  let imagearray = [];

  //! newer updates will contain the same code just new items in each array

  let versionArray = [];

  if (version >= 1) {
    i = 0;

    versions.forEach((version2) => {
      i++;
      if ("v" + i.toString() === version2) {
        if (i.toString() <= version) {
          if (!outdated.includes("v" + i.toString())) {
            versionArray.push(i.toString());
          }
        }
      } else {
      }
    });
  }

  versionArray.forEach((v) => {
    RamSetArrays(textarray, imagearray, v);
  });

  //const index = Math.floor(Math.random() * (textarray.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
  const index2 = Math.floor(Math.random() * (imagearray.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).

  res.send({
    // text: textarray[index] || "null",
    imageURL: imagearray[index2] || "null",
  });
}

module.exports = ramGet;
