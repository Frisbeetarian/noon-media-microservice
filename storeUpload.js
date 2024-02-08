const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");
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
      const actualBuffer = Buffer.isBuffer(file.buffer)
        ? file.buffer
        : Buffer.from(file.buffer.data);
      const mimeType = file.mimetype;
      const extension = mime.extension(mimeType) || ".ogg";
      const uuidFilename = `${uuidv4()}${extension}`;
      const outputPath = path.join(__dirname, "public", "audio", uuidFilename);
      fs.writeFileSync(outputPath, actualBuffer);
      return `${baseURL}/audio/${uuidFilename}`;
    }
  } catch (e) {
    console.log("error:", e);
    throw e;
  }
};

module.exports = storeUpload;
