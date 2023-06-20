const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('../controllers/userController');

// Route for retrieving all users
router.get('/', userController.getAllUsers);

// Route for creating a new user
router.post('/', userController.createUser);

// Route for retrieving a specific user
router.get('/:id', userController.getUserById);

// Route for updating a specific user
router.put('/:id', userController.updateUserById);

// Route for deleting a specific user
router.delete('/:id', userController.deleteUserById);

module.exports = router;

