const express = require('express');
const {
  getAllReviews,
  createReview,
  editReview,
  destroyReview,
  getProductReviewsByProductId,
} = require('../db/reviews');
const { requireUser } = require('./utils');
const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send({ reviews });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

reviewsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const productId = Number(id);
  try {
    const productReviews = await getProductReviewsByProductId(productId);
    res.send({ productReviews });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

reviewsRouter.post('/:productId', requireUser, async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { message } = req.body;
  try {
    const creatorId = Number(id);
    const review = await createReview({ creatorId, productId, message });
    res.send({ review });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

reviewsRouter.patch('/:reviewId', requireUser, async (req, res) => {
  const { reviewId } = req.params;
  const { message } = req.body;
  try {
    const review = await editReview({ id: reviewId, message });
    res.send({ review });
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await destroyReview(reviewId);
    if (!review) {
      res.send({
        message: 'The review has been deleted.',
      });
    }
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
});

module.exports = reviewsRouter;
