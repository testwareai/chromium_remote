const { chromium } = require("playwright");
const localtunnel = require("localtunnel");

(async () => {
  // const browser = await chromium.launch({
  //   headless: true,
  //   args: ["--remote-debugging-port=9222"],
  // });
  const port = 9222;
  const browserServer = await chromium.launchServer({ port });
  const wsEndpoint = browserServer.wsEndpoint();

  const tunnel = await localtunnel({ port });
  const publicWsEndpoint = tunnel.url.replace("http", "ws");

  console.log("WebSocket endpoint:", publicWsEndpoint);

  // Close the tunnel when done
  tunnel.on("close", () => {
    console.log("Tunnel closed");
    browserServer.close();
  });
  // console.log(`WebSocket Endpoint: ws://localhost:9222`);
  // Keep the browser open
  // await new Promise((resolve) => setTimeout(resolve, 100000));
})();
