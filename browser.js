const express = require("express");
const { chromium } = require("playwright");

// Initialize express app
const app = express();
const port = 3009; // This is the Express server port

// Middleware to parse JSON body
app.use(express.json());

app.get("/status", async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Server running on http://localhost:${port}` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
// Define the POST route
app.post("/getdata", async (req, res) => {
  const { url } = req.body; // Extract 'url' from the request body

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText);
    await browser.close();

    // For this example, we just return the WebSocket endpoint to the client.
    res.json({ bodyText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to launch the browser" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
