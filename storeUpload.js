const fs = require("fs");
const jsonfn = require("json-fn");
const shortId = require("shortid");
const path = require("path");
const Jimp = require("jimp");
// const dotenv = require("dotenv-safe").config({ silent: true });

// const UPLOAD_DIRECTORY_URL = require('../../../config/UPLOAD_DIRECTORY_URL');
const sharp = require("sharp");
const storeUpload = async (image, readStream) => {
  try {
    const buffer = Buffer.from(readStream.data, "base64");

    await sharp(buffer).toFile(
      path.join(__dirname + "/public/images/") + image.filename,
      (err, info) => {}
    );

    return process.env.URL + "/images/" + image.filename;
  } catch (e) {
    console.log("error:", e);
  }
};

module.exports = storeUpload;
