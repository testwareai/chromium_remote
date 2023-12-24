const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222"],
  });
  console.log(`WebSocket Endpoint: ws://localhost:9222`);
  // Keep the browser open
  await new Promise((resolve) => setTimeout(resolve, 100000));
})();
