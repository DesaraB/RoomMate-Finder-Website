const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authToken = require("../middleware/getAuthUser");

router.use(authToken);

// Get applications for the logged-in seeker
router.get("/", applicationController.getApplicationsForSeeker);

// Create a new application
router.post("/", applicationController.createApplication);

// Delete an application
router.delete("/:id", applicationController.deleteApplication);

// Update an application
router.patch("/:id", applicationController.updateApplication);

// ✅ New: Get applications for listings of the logged-in provider
router.get("/provider", applicationController.getApplicationsForProvider);

module.exports = router;
