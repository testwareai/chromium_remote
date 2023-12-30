const { chromium } = require("playwright");
const http = require("http");
const httpProxy = require("http-proxy");

// Create a proxy server

// Create an HTTP server that listens on port 80 (or any other port you prefer)

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);

  const proxy = httpProxy.createProxyServer({});
  http
    .createServer((req, res) => {
      // This will forward the request to your Playwright WebSocket server
      proxy.web(req, res, { target: wsEndpoint }); // Replace 3000 with your WS server port
    })
    .listen(3030, () => console.log("Proxy server running on port 3030"));
})();
