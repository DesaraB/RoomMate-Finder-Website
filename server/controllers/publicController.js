const User = require("../models/user");
const Listing = require("../models/Listing");
const bcrypt = require("bcryptjs");
const HttpError = require("../errorHandler");
const jwt = require("jsonwebtoken");

// ✅ REGISTER: Seeker or Provider
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullname,
      gender,
      age,
      dateOfBirth,
      role,
      phone_number,
      profile_picture_url,
      location,
      budgetMin,
      budgetMax,
      moveInDate,
      children,
      description,
      homeData, // Only for provider
    } = req.body;

    // Validate required user fields
    if (!username || !email || !password || !gender || !role || !age) {
      return res.status(400).json({ error: "Missing required user fields" });
    }

    // If provider, validate homeData
    if (role === "provider") {
      if (
        !homeData ||
        !homeData.title ||
        !homeData.description ||
        !homeData.location ||
        !homeData.price ||
        !homeData.bedrooms ||
        !homeData.bathrooms ||
        !homeData.property_type ||
        !homeData.available_from
      ) {
        return res
          .status(400)
          .json({ error: "Missing required listing fields for provider" });
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      fullname,
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
      description,
    });

    // If provider, create the listing
    if (role === "provider") {
      await Listing.create({
        title: homeData.title,
        description: homeData.description,
        location: homeData.location,
        price: homeData.price,
        bedrooms: homeData.bedrooms,
        bathrooms: homeData.bathrooms,
        property_type: homeData.property_type,
        amenities: homeData.amenities || "",
        available_from: homeData.available_from,
        lease_term: homeData.lease_term || "",
        photo_url: homeData.photo_url || "",
        provider_id: newUser.id,
      });
    }

    // ✅ Generate JWT with role included
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Lax",
    });

    const { password: _, ...safeUser } = newUser.get({ plain: true });

    res.status(201).json({
      message: "Registration successful",
      user: safeUser,
    });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// ✅ LOGIN
// ✅ LOGIN WITH DEBUG LOGGING
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📥 Login attempt:");
    console.log("Email:", email);
    console.log("Password (plain):", password); // ⚠️ Only during debugging

    if (!email || !password) {
      console.log("❌ Missing credentials");
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ No user found for email:", email);
      return res.status(401).json({ error: "Invalid credentials." });
    }

    console.log("🔎 Found user:", user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("🔐 Password match:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    const { password: _, ...safeUser } = user.get({ plain: true });

    console.log("✅ Login successful:", safeUser.email);

    return res.status(200).json({ status: 200, user: safeUser });
  } catch (error) {
    console.error("💥 Login error:", error);
    return res.status(500).json({ error: "Server error." });
  }
};

// ✅ GET ALL LISTINGS
exports.listings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "fullname", "email"],
        },
      ],
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting listings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGOUT
exports.logout = async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({ status: 200, message: "You are logged out" });
};
