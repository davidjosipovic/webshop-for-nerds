const express = require('express');
const router = express.Router();

// Import the order controller
const orderController = require('../controllers/orderController');

// Route for retrieving all orders
router.get('/', orderController.getAllOrders);

// Route for creating a new order
router.post('/', orderController.createOrder);

// Route for retrieving a specific order
router.get('/:id', orderController.getOrderById);

// Route for updating a specific order
router.put('/:id', orderController.updateOrderById);

// Route for deleting a specific order
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;

