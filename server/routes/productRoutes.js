const express = require('express');
const router = express.Router();

// Import the product controller
const productController = require('../controllers/productController');

// Route for retrieving all products
router.get('/', productController.getProductsByCategory);

// Route for creating a new product
router.post('/', productController.createProduct);

// Route for retrieving a specific product
router.get('/:id', productController.getProductById);

// Route for updating a specific product
router.put('/:id', productController.updateProductById);

// Route for deleting a specific product
router.delete('/:id', productController.deleteProductById);

module.exports = router;
