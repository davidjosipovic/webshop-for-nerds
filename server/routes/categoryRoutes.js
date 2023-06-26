const express = require('express');
const router = express.Router();

// Import the category controller
const categoryController = require('../controllers/categoryController');

// Route for retrieving all categories
router.get('/', categoryController.getAllCategories);

// Route for creating a new category
router.post('/', categoryController.createCategory);

// Route for retrieving a specific category
router.get('/:id', categoryController.getCategoryById);

// Route for updating a specific category
router.put('/:id', categoryController.updateCategoryById);

// Route for deleting a specific category
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
