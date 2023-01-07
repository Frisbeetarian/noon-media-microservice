const rpcClient = require("./client");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storeUpload = require("./storeUpload");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

async function media(index, params) {
  switch (index) {
    case "UPLOAD_IMAGE": {
      try {
        return await storeUpload(
          "UPLOAD_IMAGE",
          params.file,
          params.readStream
        );
      } catch (e) {
        console.log("error:", e);
        return false;
      }
    }

    case "UPLOAD_AUDIO_RECORDING": {
      try {
        return await storeUpload(
          "UPLOAD_AUDIO",
          params.file,
          params.readStream
        );
        // console.log("upload audio recording index:", index);
        // console.log("upload audio recording params:", params);
        // console.log("upload audio recording buffer:", params.file.buffer.data);
        // let filename = Math.floor(Date.now() / 1000) + ".ogg";
        //
        // let binary = Buffer.from(params.file.buffer.data, "base64");
        //
        // fs.writeFileSync(
        //   path.join(__dirname + "/public/audio/") + filename,
        //   binary
        // );
        //
        // return process.env.URL + "/audio/" + filename;
      } catch (e) {
        console.log("error:", e);
        return false;
      }
    }

    default: {
      return null;
    }
  }
}

module.exports = media;
