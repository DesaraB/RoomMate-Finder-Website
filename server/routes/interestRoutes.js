const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interestController");
const authToken = require("../middleware/getAuthUser");

router.use(authToken);

// GET all interests for the logged-in seeker
router.get("/", interestController.getInterests);

// POST a new interest
router.post("/", interestController.saveInterest);

// DELETE an interest by ID
router.delete("/:id", interestController.deleteInterest);


module.exports = router;
