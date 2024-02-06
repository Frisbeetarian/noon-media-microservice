const fs = require("fs");
const jsonfn = require("json-fn");
const shortId = require("shortid");
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
// const dotenv = require("dotenv-safe").config({ silent: true });

// const UPLOAD_DIRECTORY_URL = require('../../../config/UPLOAD_DIRECTORY_URL');
const sharp = require("sharp");
const baseURL = process.env.URL || "http://localhost:4060";

const storeUpload = async (task, file) => {
  try {
    const buffer = file.buffer;
    console.log(task);

    if (task === "UPLOAD_IMAGE") {
      const actualBuffer = Buffer.from(file.buffer.data);
      const originalFilename = file.filename;
      const extension = path.extname(originalFilename);
      const uuidFilename = `${uuidv4()}${extension}`;
      const outputPath = path.join(__dirname, "public", "images", uuidFilename);
      await sharp(actualBuffer).toFile(outputPath);
      return `${baseURL}/images/${uuidFilename}`;
    } else if (task === "UPLOAD_AUDIO_RECORDING") {
      const originalFilename = file.filename;
      const extension = path.extname(originalFilename);
      const uuidFilename = `${uuidv4()}${extension}`;
      // const filename = `${Math.floor(Date.now() / 1000)}.ogg`;
      const outputPath = path.join(__dirname, "public", "audio", uuidFilename);
      fs.writeFileSync(outputPath, buffer);
      return `${baseURL}/audio/${uuidFilename}`;
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
