const express = require("express");
const { chromium } = require("playwright");

// Initialize express app
const app = express();
const port = 3009;

// Middleware to parse JSON body
app.use(express.json());

let browser; // Declare the browser variable outside the request handler

async function launchBrowser() {
  browser = await chromium.launch(); // Launch browser
}

app.get("/status", async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Server running on http://localhost:${port}` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.post("/getdata", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    if (!browser) await launchBrowser(); // Ensure the browser is launched
    const context = await browser.newContext();
    const page = await context.newPage();

    // Try to navigate to the page, with handling for navigation timeout/failure
    try {
      await page.goto(url, { timeout: 15000 });
    } catch (error) {
      console.error("Page navigation timed out or failed:", error.message);
      // Even in case of timeout/failure, we proceed to try and extract the body text.
    }

    const bodyText = await page.evaluate(() => document.body.innerText);
    await context.close(); // Close the context after use

    res.json({ bodyText });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to process the request", reason: error.message });
  }
});

// Close the browser when the server is closing
process.on("exit", () => {
  if (browser) browser.close();
});

launchBrowser().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
