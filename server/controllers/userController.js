const bcrypt = require("bcryptjs");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      role,
      phone_number,
      profile_picture_url,
      location,
      budgetMin,
      budgetMax,
      moveInDate,
      age,
      children,
      description,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !role ||
      !dateOfBirth ||
      !age
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      role,
      phone_number,
      profile_picture_url,
      location,
      budgetMin: role === "seeker" ? budgetMin : null,
      budgetMax: role === "seeker" ? budgetMax : null,
      moveInDate: role === "seeker" ? moveInDate : null,
      age,
      children: role === "seeker" ? children : null,
      description: role === "seeker" ? description : null,
    });
    const token = jwt.sign({ id: newUser.id }, "your_jwt_secret", {
      expiresIn: "7d", // optional
    });
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Create user error:", err);
    res.status(400).json({ error: err.message });
  }
};

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

exports.checkAuthUser = async (req, res) => {
  try {
    res.status(200).json("user------");
  } catch (error) {
	console.log("error-----",error);
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
    res.status(200).json(user);
  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(req.body); // Make sure only safe fields are updated in production
    res.status(200).json(user);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: err.message });
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
