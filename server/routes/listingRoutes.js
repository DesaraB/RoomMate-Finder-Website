// routes/listingRoutes.js
const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

// Get all listings
router.get("/", listingController.getAllListings);

// Get listing by ID
router.get("/:id", listingController.getListingById);

// Get listings by provider ID
router.get("/provider/:providerId", listingController.getListingsByUser);

// Create a new listing
router.post("/", listingController.createListing);

// Update a listing
router.put("/:id", listingController.updateListing);

// Delete a listing
router.delete("/:id", listingController.deleteListing);

module.exports = router;
