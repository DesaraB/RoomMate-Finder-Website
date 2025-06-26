const { Listing, User } = require("../models");

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
  try {
    const listingId = parseInt(req.params.id);
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
      req.files?.cover_photo?.[0]?.path?.replace(/\\/g, "/").replace("public/", "") || null;

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
      req.files?.cover_photo?.[0]?.path?.replace(/\\/g, "/").replace("public/", "") || null;
    if (coverPhoto) {
      updates.photo_url = coverPhoto;
    }

    // ✅ Add new gallery photos if uploaded
    const newGalleryPhotos =
      req.files?.gallery_photos?.map((file) =>
        file.path.replace(/\\/g, "/").replace("public/", "")
      ) || [];

    // ✅ Fetch existing gallery photos to merge
    const existingListing = await Listing.findByPk(listingId);
    const existingGallery = existingListing.gallery_photos || [];

    // ✅ Merge new and old photos
    const mergedGallery = [...existingGallery, ...newGalleryPhotos];
    updates.gallery_photos = mergedGallery;

    const [updatedRows] = await Listing.update(updates, {
      where: { id: listingId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const updatedListing = await Listing.findByPk(listingId);
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Server error" });
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
};
