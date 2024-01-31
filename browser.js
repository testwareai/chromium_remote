const { chromium } = require("playwright");

(async () => {
  const browserServer = await chromium.launchServer({
    port: 8080,
    wsPath: "chromium",
    channel: "chrome",
    timeout: 15000,
    args: ["--disable-web-security"],
  });
  const wsEndpoint = browserServer.wsEndpoint();
  console.log(wsEndpoint);
})();
