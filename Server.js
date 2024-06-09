const express = require("express");
require("dotenv").config();
const db = require("./db"); // Import the db connection
const bodyParser = require("body-parser");
const passport = require("./Auth");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());
// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
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
