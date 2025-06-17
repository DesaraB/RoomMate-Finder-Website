const { Application, Listing, User } = require("../models");

// 1️⃣ Get applications for the logged-in seeker
exports.getApplicationsForSeeker = async (req, res) => {
  try {
    const seekerId = req.user.id;

    const applications = await Application.findAll({
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
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 2️⃣ Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { listingId, message } = req.body;
    const seekerId = req.user.id; // 👍 seeker = user with role 'seeker'
    const userRole = req.user.role;

    if (!listingId) {
      return res.status(400).json({ error: "listingId is required." });
    }

    // Only seekers can apply
    if (userRole !== "seeker") {
      return res.status(403).json({
        error: "Only seekers can apply to listings.",
      });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      where: { seeker_id: seekerId, listing_id: listingId },
    });

    if (alreadyApplied) {
      return res.status(400).json({
        error: "You have already applied to this listing.",
      });
    }

    const newApplication = await Application.create({
      seeker_id: seekerId,
      listing_id: listingId,
      message,
      status: "pending",
    });

    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
// 3️⃣ Delete an applicationac
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const seekerId = req.user.id;

    const application = await Application.findOne({
      where: { id, seekerId },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    await application.destroy();
    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 4️⃣ Update application
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const seekerId = req.user.id;
    const updates = req.body;

    const application = await Application.findOne({
      where: { id, seekerId },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    await application.update(updates);
    res.status(200).json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 5️⃣ Get applications for listings of the logged-in provider
exports.getApplicationsForProvider = async (req, res) => {
  try {
    const providerId = req.user.id;
    const applications = await Application.findAll({
      include: [
        {
          model: Listing,
          as: "listing",
          where: { provider_id: providerId },
          include: {
            model: User,
            as: "provider",
            attributes: ["id", "name", "email"],
          },
        },
        {
          model: User,
          as: "seeker",
          attributes: ["id", "name", "email", "profile_picture_url"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications for provider:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// PUT /api/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json(application);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

