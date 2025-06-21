const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/upload");
const authToken = require("../middleware/getAuthUser"); // ✅ Import the auth middleware

// ✅ Protected route - requires valid JWT
router.get("/checkAuth", authToken, userController.checkAuthUser);

// Other user routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", upload.single("profile_picture"), userController.updateUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/register", userController.registerProvider);


module.exports = router;
