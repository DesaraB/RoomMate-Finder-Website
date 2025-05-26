// routes/listingRoutes.js
const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const User = require("../models/User");

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting listings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error getting listing:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new listing
router.post("/", async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a listing
router.put("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await listing.update(req.body);
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a listing
router.delete("/:id", async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await listing.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get listings by provider ID
router.get("/provider/:providerId", async (req, res) => {
  try {
    const listings = await Listing.findAll({
      where: { provider_id: req.params.providerId },
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting provider listings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
