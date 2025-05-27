// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user
router.post('/register', userController.createUser); // This matches the /api/users/register route

// Other user routes
router.get('/', userController.getAllUsers);
router.get('/checkAuthUser',userController.checkAuthUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
