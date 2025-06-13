const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

router.post("/register", publicController.register);
router.post("/login", publicController.login);
router.post("/logout", publicController.logout);
router.get("/listings", publicController.listings);
module.exports = router;
