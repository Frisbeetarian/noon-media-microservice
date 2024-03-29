const { RPCClient } = require("@noon/rabbit-mq-rpc");

const connectionObject = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  locale: "en_US",
  vhost: "/",
};

const QUEUES = {
  MEDIA_SERVER: {
    channel: "media",
    queue: "rpc_queue.noon.media-results",
  },
};

const client = new RPCClient({
  connectionObject,
  hostId: "localhost",
});

let rpcClientInitialized = false;

async function initRPCClient() {
  console.log("rpcClientInitialized:", rpcClientInitialized);
  if (rpcClientInitialized) {
    return;
  }

  await Promise.all(
    Object.values(QUEUES).map(async ({ channel, queue }) => {
      await client.addChannel({
        name: channel,
        queue,
      });
    })
  );

  rpcClientInitialized = true;
}

async function mediaRPCRequest(channel, task, params) {
  await initRPCClient();
  try {
    return await client.rpcRequest(channel, task, params);
  } catch (e) {
    console.log("error:", e);
    return null;
  }
}

function returnMediaResult() {
  const channel = QUEUES.MEDIA_SERVER.channel;

  return {
    async returnFile(
      path,
      type,
      conversationUuid,
      conversationType,
      senderProfileUuid,
      senderProfileUsername,
      messageUuid,
      participantUuids
    ) {
      try {
        const responseMessage = {
          status: "success",
          filePath: path,
          type,
          conversationUuid: conversationUuid,
          conversationType: conversationType,
          senderProfileUuid: senderProfileUuid,
          senderProfileUsername: senderProfileUsername,
          messageUuid: messageUuid,
          participantUuids: participantUuids,
        };

        return await mediaRPCRequest(
          channel,
          "RPC_MEDIA_RESULTS_RECEIVED",
          responseMessage
        );
      } catch (e) {
        console.log("error:", e);
        return null;
      }
    },
  };
}

module.exports.returnMediaResult = returnMediaResult;
