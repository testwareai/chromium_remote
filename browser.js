const http = require("http");
const httpProxy = require("http-proxy");
const { chromium } = require("playwright");

(async () => {
  // Launch the Playwright browser server
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();

  // Create a proxy server
  const proxy = httpProxy.createProxyServer({
    target: wsEndpoint,
    ws: true,
  });

  // Create an HTTP server that listens on all interfaces
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Playwright server proxy");
  });

  // Upgrade WebSocket requests
  server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
  });

  const PORT = 42001; // You can choose any port
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
  });
})();
