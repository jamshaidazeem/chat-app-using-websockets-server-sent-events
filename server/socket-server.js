const WebSocket = require("ws");

const PORT = 3000;

// create a WebSocket server
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("client connected");

  console.log("🚀 ~ wss.on ~ ws:", ws);

  ws.on("message", (message) => {
    const newMessageFromClient = JSON.parse(message);
    console.log("🚀 ~ ws.on ~ newMessageFromClient:", newMessageFromClient);
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

console.log(`WebSocket server listening on port ${PORT}`);
