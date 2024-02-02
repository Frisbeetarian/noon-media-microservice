const fs = require("fs");
const jsonfn = require("json-fn");
const shortId = require("shortid");
const path = require("path");
const Jimp = require("jimp");
// const dotenv = require("dotenv-safe").config({ silent: true });

// const UPLOAD_DIRECTORY_URL = require('../../../config/UPLOAD_DIRECTORY_URL');
const sharp = require("sharp");
const baseURL = process.env.URL || "http://localhost:4060";

const storeUpload = async (task, file, readStream) => {
  console.log("file:", file);

  try {
    const buffer = file.buffer;

    if (task === "UPLOAD_IMAGE") {
      const outputPath = path.join(__dirname, "/public/images/", file.filename);
      await sharp(buffer).toFile(outputPath);
      return `${baseURL}/images/${file.filename}`;
    } else if (task === "UPLOAD_AUDIO") {
      const filename = `${Math.floor(Date.now() / 1000)}.ogg`;
      const outputPath = path.join(__dirname, "/public/audio/", filename);
      fs.writeFileSync(outputPath, buffer);
      return `${baseURL}/audio/${filename}`;
    }
  } catch (e) {
    console.log("error:", e);
    throw e;
  }

  // try {
  //   const buffer = Buffer.from(readStream.data, "base64");
  //
  //   if (task === "UPLOAD_IMAGE") {
  //     await sharp(buffer).toFile(
  //       path.join(__dirname + "/public/images/") + file.filename,
  //       (err, info) => {}
  //     );
  //
  //     return process.env.URL + "/images/" + file.filename;
  //   } else if (task === "UPLOAD_AUDIO") {
  //     let filename = Math.floor(Date.now() / 1000) + ".ogg";
  //
  //     let binary = Buffer.from(readStream.data, "base64");
  //
  //     fs.writeFileSync(
  //       path.join(__dirname + "/public/audio/") + filename,
  //       binary
  //     );
  //
  //     return process.env.URL + "/audio/" + filename;
  //   }
  // } catch (e) {
  //   console.log("error:", e);
  // }
};

module.exports = storeUpload;
