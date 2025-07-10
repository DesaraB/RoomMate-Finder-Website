const express = require("express");
const router = express.Router();
const multer = require("multer");
const listingController = require("../controllers/listingController");

// Multer storage config
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


// ✅ FIRST: Search route (must come before "/:id")
router.get("/search", listingController.searchListings);

// ✅ THEN: Get listings by provider ID
router.get("/provider/:providerId", listingController.getListingsByUser);

// ✅ Then: Get listing by ID
router.get("/:id", listingController.getListingById);

// ✅ Get all listings (base path)
router.get("/", listingController.getAllListings);

// ✅ Create a new listing
router.post(
  "/",
  upload.fields([
    { name: "cover_photo", maxCount: 1 },
    { name: "gallery_photos", maxCount: 10 },
  ]),
  listingController.createListing
);

// ✅ Update a listing
router.put(
  "/:id",
  upload.fields([
    { name: "cover_photo", maxCount: 1 },
    { name: "gallery_photos", maxCount: 10 },
  ]),
  listingController.updateListing
);

// ✅ Delete a listing
router.delete("/:id", listingController.deleteListing);

module.exports = router;
