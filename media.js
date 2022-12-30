const rpcClient = require("./client");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
        console.log("upload image index:", index);
        console.log("upload image params:", params);
        console.log("upload image buffer:", params.image.buffer.data);
        let date = new Date();
        let filename = Math.floor(Date.now() / 1000) + ".jpg";

        // fs.writeFile(filename, params.image, "binary", (err) => {
        //   if (!err) console.log(`${filename} created successfully!`);
        // });
        let binary = Buffer.from(params.image.buffer.data, "base64");

        fs.writeFileSync(
          path.join(__dirname + "/public/images/") + filename,
          binary
        );

        return "http://localhost:4060/images/" + filename;
      } catch (e) {
        console.log("error:", e);
        return false;
      }

      // upload.single(params.image);
    }

    case "UPLOAD_AUDIO_RECORDING": {
      try {
        console.log("upload audio recording index:", index);
        console.log("upload audio recording params:", params);
        console.log("upload audio recording buffer:", params.file.buffer.data);
        let filename = Math.floor(Date.now() / 1000) + ".ogg";

        let binary = Buffer.from(params.file.buffer.data, "base64");

        fs.writeFileSync(
          path.join(__dirname + "/public/audio/") + filename,
          binary
        );

        return "http://localhost:4060/audio/" + filename;
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
