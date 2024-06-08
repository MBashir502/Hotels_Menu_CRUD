const express = require("express");
const router = express.Router(); // Corrected this line
const MenuItem = require("./../Models/MenuItem");

// POST method to add menu items
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get method to get all persons
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET method to get menu items by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste === "sweet" || taste === "spicy" || taste === "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      console.log("Invalid Taste Type:", taste);
      res.status(404).json({ error: "Invalid Taste Type..." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
