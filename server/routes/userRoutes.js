const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Other user routes
router.get("/", userController.getAllUsers);
router.get("/checkAuth", userController.checkAuthUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/register", userController.registerProvider);


module.exports = router;
