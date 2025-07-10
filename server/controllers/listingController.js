const { Listing, User } = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "fullname", "profile_picture_url"],
        },
      ],
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting listings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get listing by ID
const getListingById = async (req, res) => {
  const listingId = parseInt(req.params.id);

  if (isNaN(listingId)) {
    return res.status(400).json({ message: "Invalid listing ID" });
  }

  try {
    const listing = await Listing.findOne({
      where: { id: listingId },
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "fullname", "profile_picture_url"],
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
};

// Get listings by provider user ID
const getListingsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.providerId);
    const listings = await Listing.findAll({
      where: { provider_id: userId },
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "fullname", "profile_picture_url"],
        },
      ],
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting user listings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new listing
const createListing = async (req, res) => {
  try {
    const {
      provider_id,
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      property_type,
      amenities,
      available_from,
      lease_term,
    } = req.body;

    const coverPhoto =
      req.files?.cover_photo?.[0]?.path
        ?.replace(/\\/g, "/")
        .replace("public/", "") || null;

    const galleryPhotos =
      req.files?.gallery_photos?.map((file) =>
        file.path.replace(/\\/g, "/").replace("public/", "")
      ) || [];

    const newListing = await Listing.create({
      provider_id,
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      property_type,
      amenities: Array.isArray(amenities) ? amenities.join(",") : amenities,
      available_from,
      lease_term,
      photo_url: coverPhoto,
      gallery_photos: galleryPhotos,
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update listing

const updateListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const updates = req.body;

    // Parse amenities
    if (updates.amenities && Array.isArray(updates.amenities)) {
      updates.amenities = updates.amenities.join(",");
    }

    // ✅ Add cover photo if uploaded
    const coverPhoto =
      req.files?.cover_photo?.[0]?.path
        ?.replace(/\\/g, "/")
        .replace("public/", "") || null;
    if (coverPhoto) {
      updates.photo_url = coverPhoto;
    }

    // ✅ Parse kept gallery photos from frontend (before upload)
    const updatedGalleryFromFrontend = req.body.gallery_photos
      ? JSON.parse(req.body.gallery_photos)
      : [];

    // ✅ Handle newly uploaded gallery photos
    const newGalleryPhotos =
      req.files?.gallery_photos?.map((file) =>
        file.path.replace(/\\/g, "/").replace("public/", "")
      ) || [];

    // ✅ Get existing listing from DB
    const existingListing = await Listing.findByPk(listingId);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const existingGallery = existingListing.gallery_photos || [];

    // ✅ Identify removed files
    const removedPhotos = existingGallery.filter(
      (photo) => !updatedGalleryFromFrontend.includes(photo)
    );

    // ✅ Delete removed files from disk
    removedPhotos.forEach((photoPath) => {
      const absolutePath = path.join(__dirname, "..", "public", photoPath);
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Failed to delete ${photoPath}:`, err.message);
        } else {
          console.log(`Deleted: ${photoPath}`);
        }
      });
    });

    // ✅ Save updated gallery
    updates.gallery_photos = [
      ...updatedGalleryFromFrontend,
      ...newGalleryPhotos,
    ];

    // ✅ Update listing
    const [updatedRows] = await Listing.update(updates, {
      where: { id: listingId },
    });

    const updatedListing = await Listing.findByPk(listingId);
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// 🔍 Search listings by location or description
const searchListings = async (req, res) => {
  const { query } = req.query;

  try {
    const listings = await Listing.findAll({
      where: {
        [Op.or]: [
          { location: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { title: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "fullname", "profile_picture_url"],
        },
      ],
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error searching listings:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

// Delete listing
const deleteListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id);
    const deletedRows = await Listing.destroy({ where: { id: listingId } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllListings,
  getListingById,
  getListingsByUser,
  createListing,
  updateListing,
  deleteListing,
  searchListings,
};
