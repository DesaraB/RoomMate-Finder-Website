// ✅ Fixed: controllers/interestController.js
const Interest = require("../models/Interest");
const Listing = require("../models/Listing");
const User = require("../models/User");

// ✅ Make sure Sequelize associations are loaded (to enable `include`)
require("../models/associations"); // This sets up associations

// Get interests for logged-in seeker
exports.getInterests = async (req, res) => {
  try {
    const seekerId = req.user.id;

    const interests = await Interest.findAll({
      where: { seeker_id: seekerId },
      include: [
        {
          model: Listing,
          as: "listing",
          include: {
            model: User,
            as: "provider",
            attributes: ["id", "name", "email"],
          },
        },
      ],
    });

    res.status(200).json(interests);
  } catch (error) {
    console.error("Error fetching interests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Save a listing
exports.saveInterest = async (req, res) => {
  try {
    const { listingId } = req.body;
    const seekerId = req.user.id;

    const alreadySaved = await Interest.findOne({
      where: { seeker_id: seekerId, listing_id: listingId },
    });

    if (alreadySaved) {
      return res.status(400).json({ error: "You already saved this listing." });
    }

    const interest = await Interest.create({
      seeker_id: seekerId,
      listing_id: listingId,
    });

    res.status(201).json(interest);
  } catch (error) {
    console.error("Error saving interest:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove saved listing
exports.deleteInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const seekerId = req.user.id;

    const interest = await Interest.findOne({
      where: { id, seeker_id: seekerId },
    });

    if (!interest) {
      return res.status(404).json({ error: "Interest not found." });
    }

    await interest.destroy();
    res.status(200).json({ message: "Removed from saved listings." });
  } catch (error) {
    console.error("Error deleting interest:", error);
    res.status(500).json({ error: "Server error" });
  }
};
