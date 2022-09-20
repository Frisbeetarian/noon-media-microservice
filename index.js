const { RPCServer } = require("@noon/rabbit-mq-rpc/server");
const media = require("./media");

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
        console.log("RPC_MEDIA_RECEIVED", { index });
        return media(index, params);
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
