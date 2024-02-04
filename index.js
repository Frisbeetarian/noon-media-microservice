const { RPCServer } = require("@noon/rabbit-mq-rpc");
const media = require("./media");
const express = require("express");
const path = require("path");
require("dotenv").config();

const connectionObject = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  locale: "en_US",
  vhost: "/",
};

async function establishRPCConsumer() {
  try {
    const rpcServer = new RPCServer({
      connectionObject,
      hostId: "localhost",
      queue: "rpc_queue.noon.media",
      handleMessage: (index, params) => {
        console.log("RPC_MEDIA_RECEIVED", { index, params });
        if (params.file) {
          return media(index, params);
        }
      },
    });

    await rpcServer.start();

    console.log("RPC_CONNECTION_SUCCESSFUL", {
      hostId: "localhost",
      queue: "rpc_queue.noon.media",
    });
  } catch (e) {
    console.log("RPC_CONNECTION_FAILED", JSON.stringify(e));

    setTimeout(() => {
      console.error(e);
      process.exit(1);
    }, 2000);
  }
}

establishRPCConsumer();

let app = express();

app.use("/images", express.static(path.join(__dirname + "/public/images")));
app.use("/audio", express.static(path.join(__dirname + "/public/audio")));
// app.listen(4050);

let server = app.listen(4060, () =>
  console.log(`server listening at http://localhost:${4060}`)
);
