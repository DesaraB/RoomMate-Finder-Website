const express = require("express");
const router = express.Router();
const multer = require("multer");
const listingController = require("../controllers/listingController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get all listings
router.get("/", listingController.getAllListings);

// Get listing by ID
router.get("/:id", listingController.getListingById);

// Get listings by provider ID
router.get("/provider/:providerId", listingController.getListingsByUser);

// Create a new listing
router.post(
  "/",
  upload.fields([
    { name: "cover_photo", maxCount: 1 },
    { name: "gallery_photos", maxCount: 10 },
  ]),
  listingController.createListing
);

// ✅ FIXED: Update a listing (now accepts multipart/form-data)
router.put(
  "/:id",
  upload.fields([
    { name: "cover_photo", maxCount: 1 },
    { name: "gallery_photos", maxCount: 10 },
  ]),
  listingController.updateListing
);

// Delete a listing
router.delete("/:id", listingController.deleteListing);

module.exports = router;
