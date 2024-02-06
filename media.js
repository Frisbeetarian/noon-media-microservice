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

async function media(index, params) {
  switch (index) {
    case "UPLOAD_IMAGE": {
      try {
        const path = await storeUpload("UPLOAD_IMAGE", params.file);

        if (path) {
          await rpcClient
            .returnMediaResult()
            .returnFile(
              path,
              "image",
              params.conversationUuid,
              params.conversationType,
              params.senderProfileUuid,
              params.senderProfileUsername,
              params.messageUuid,
              params.participantUuids
            );
        }

        // sendSuccessNotification(path, "image");
      } catch (e) {
        console.log("error:", e);
        return false;
      }
    }

    case "UPLOAD_AUDIO_RECORDING": {
      try {
        const path = await storeUpload("UPLOAD_AUDIO_RECORDING", params.file);

        if (path) {
          await rpcClient
            .returnMediaResult()
            .returnFile(
              path,
              "audio",
              params.conversationUuid,
              params.conversationType,
              params.senderProfileUuid,
              params.senderProfileUsername,
              params.messageUuid,
              params.participantUuids
            );
        }
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
