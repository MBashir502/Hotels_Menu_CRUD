const express = require("express");
require("dotenv").config();
const db = require("./db"); // Import the db connection
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Most Welcome....");
});

// Import and use the Router files
const PersonRoutes = require("./Routes/PersonRoutes");
const MenuItemRoutes = require("./Routes/MenuItemRoutes");

app.use("/person", PersonRoutes);
app.use("/menu", MenuItemRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
