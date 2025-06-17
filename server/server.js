const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const authToken = require("./middleware/getAuthUser");

// Import routes
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const publicRoutes = require("./routes/publicRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const interestRoutes= require("./routes/interestRoutes");

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Public routes (no auth required)
app.use("/api/users", publicRoutes);

// 🔐 Auth middleware for private routes
app.use(authToken);

// ✅ Private routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interests", interestRoutes);

// Sequelize sync
sequelize
.sync() 
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
