const { chromium } = require("playwright");

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);
})();
