const WebSocket = require("ws");

const PORT = 3000;

// create a WebSocket server
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (message) => {
    const newMessageFromClient = JSON.parse(message);
    // sending to all clients including the sender
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessageFromClient));
      }
    });
    /* sending to all clients excluding the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessageFromClient));
      }
    }); */
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

console.log(`WebSocket server listening on port ${PORT}`);
