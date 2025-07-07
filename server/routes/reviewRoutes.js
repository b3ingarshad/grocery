const {
  addReview,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");
const express = require("express");
const router = express.Router();

router.route("/").get(getReviews).post(addReview);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
