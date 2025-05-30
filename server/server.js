const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const authToken = require("./middleware/getAuthUser");

// Import routes
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const interestRoutes = require("./routes/interestRoutes");
const listingRoutes = require("./routes/listingRoutes");

const publicRoutes = require("./routes/publicRoutes");

dotenv.config();

// Create the app
const app = express();

// Add CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/users",publicRoutes);

app.use(authToken);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/listings", listingRoutes);

// Sync models
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
