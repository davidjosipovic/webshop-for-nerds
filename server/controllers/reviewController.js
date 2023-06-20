

const Review = require('../models/Review');

// Retrieve all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

// Create a new review
const createReview = async (req, res) => {
  const { userId, productId, rating, comment } = req.body;

  try {
    const review = await Review.create({
      userId,
      productId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Retrieve a specific review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve review' });
  }
};

// Update a specific review by ID
const updateReviewById = async (req, res) => {
  const { id } = req.params;
  const { userId, productId, rating, comment } = req.body;

  try {
    const review = await Review.findByPk(id);

    if (review) {
      review.userId = userId;
      review.productId = productId;
      review.rating = rating;
      review.comment = comment;

      await review.save();
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a specific review by ID
const deleteReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);

    if (review) {
      await review.destroy();
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
