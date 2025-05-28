const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

router.post("/logout", publicController.logout);
router.post("/login", publicController.login);

module.exports = router;
