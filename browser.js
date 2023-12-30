// Import the express module
const express = require("express");

// Create an instance of express
const app = express();

// Define a port to listen to
const port = 3010;

// Set up a route for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
