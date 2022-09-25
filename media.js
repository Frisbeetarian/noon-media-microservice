const rpcClient = require("./client");
// import nodeMailer from "nodeMailer";

async function media(index, params) {
  switch (index) {
    case "UPLOAD_IMAGE": {
      console.log("upload image index:", index);
      console.log("upload image params:", params);
    }

    default: {
      return null;
    }
  }
}

module.exports = media;
