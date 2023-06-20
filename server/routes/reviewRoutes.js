const express = require('express');
const router = express.Router();

// Import the review controller
const reviewController = require('../controllers/reviewController');

// Route for retrieving all reviews
router.get('/', reviewController.getAllReviews);

// Route for creating a new review
router.post('/', reviewController.createReview);

// Route for retrieving a specific review
router.get('/:id', reviewController.getReviewById);

// Route for updating a specific review
router.put('/:id', reviewController.updateReviewById);

// Route for deleting a specific review
router.delete('/:id', reviewController.deleteReviewById);

module.exports = router;

