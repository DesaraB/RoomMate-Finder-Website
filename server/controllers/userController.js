const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Listing = require("../models/listing");
const HttpError = require("../errorHandler");
const jwt = require("jsonwebtoken");
const { Error } = require("sequelize");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Check authenticated user
exports.checkAuthUser = async (req, res) => {
  try {
    const authUser = await User.findOne({ where: { id: req.user.id } });
    if (!authUser) {
      throw new Error("User not found");
    }
    const { password, ...safeUser } = authUser.get({ plain: true });
    res.status(200).json({ status: 200, user: safeUser });
  } catch (error) {
    console.log("error-----", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("hello---",user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  console.log("Received update payload:", req.body);

  try {
    const { password, ...otherFields } = req.body;
    const updatedData = { ...otherFields };

    // ✅ Add profile picture if a file was uploaded
    if (req.file) {
      updatedData.profile_picture_url = `/uploads/${req.file.filename}`;
    }

    // ✅ Hash password if present
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // ✅ Update user in DB
    await User.update(updatedData, {
      where: { id: req.params.id },
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Register Provider (and listing in one go)
exports.registerProvider = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      gender,
      age,
      phone_number,
      description,
      location,
      homeData,
    } = req.body;

    if (!username || !email || !password || !name || !gender) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the provider
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      gender,
      age,
      phone_number,
      description,
      location,
      role: "provider",
    });

    // Create listing for the provider
    if (homeData) {
      await Listing.create({
        provider_id: newUser.id,
        title: homeData.title,
        description: homeData.description,
        location: homeData.location,
        price: homeData.price,
        bedrooms: homeData.bedrooms,
        bathrooms: homeData.bathrooms,
        property_type: homeData.property_type,
        available_from: homeData.available_from,
        lease_term: homeData.lease_term,
        amenities: homeData.amenities,
        photo_url: homeData.photo_url,
      });
    }

    // Generate JWT token (optional)
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", token, { httpOnly: true, sameSite: "Lax" });

    // Return the created user without the password
    const { password: _, ...userData } = newUser.toJSON();
    res.status(201).json(userData);
  } catch (error) {
    console.error("Error registering provider:", error);
    res.status(500).json({ error: "Server error" });
  }
};
