const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  res.send("login");
});

router.post("/update", (req, res) => {
  res.send("register");
});

module.exports = router;
