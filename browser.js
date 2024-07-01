import express from "express";
import FirecrawlApp from "@mendable/firecrawl-js";


// Initialize express app
const app = express();
const port = 3010;

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

app.post("/getdata", async (req, res) => {
  const { url } = req.body;
  let scrapedData=null
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
      const fireCrawl_app = new FirecrawlApp({ apiKey: "fc-d16bd62e11184eceb1f0db569ed67441" });

scrapedData = await fireCrawl_app.scrapeUrl(url);
    
    res.status(200).json({ bodyText: scrapedData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to process the request", reason: error.message });
  }
});


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
