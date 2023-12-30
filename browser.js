const { chromium } = require("playwright");
const localtunnel = require("localtunnel");
const http = require("http"); // Import the http module

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();

  const port = 3030; // This will be the port for your local server
  const tunnel = await localtunnel({ port });
  const publicWsEndpoint = tunnel.url.replace("http", "ws");

  console.log("WebSocket endpoint:", publicWsEndpoint);

  // HTTP server to keep the script running
  http
    .createServer((req, res) => {
      res.write("Server is running. WebSocket Endpoint: " + publicWsEndpoint);
      res.end();
    })
    .listen(port, () => {
      console.log(`HTTP server is running on http://localhost:${port}`);
    });

  // Close the tunnel and browser server when the process is terminated
  process.on("SIGINT", () => {
    console.log("Received SIGINT. Shutting down gracefully.");
    tunnel.close();
    browserServer.close();
    process.exit();
  });

  // Close the tunnel when done
  tunnel.on("close", () => {
    console.log("Tunnel closed");
    browserServer.close();
  });
})();
