const { chromium } = require("playwright");

(async () => {
  const browserServer = await chromium.launchServer({
    port: 8080,
    wsPath: "chromium",
  });
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);
})();
