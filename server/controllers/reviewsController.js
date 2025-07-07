const review = require("../models/reviewsModel");

const addReview = async (req, res) => {
  try {
    const newReview = await review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await review.find({});
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getReview = async (req, res) => {
  try {
    const reviewID = req.params.id;
    const reviews = await review.findOne({ _id: reviewID });
    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: Rs{reviewID}` });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewID = req.params.id;
    const reviews = await review.findOneAndUpdate({ _id: reviewID }, req.body);
    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: Rs{reviewID}` });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewID = req.params.id;

    // Find and delete the review
    const reviews = await review.findByIdAndDelete(reviewID);

    if (!reviews) {
      return res
        .status(404)
        .json({ msg: `No review found with id: ${reviewID}` });
    }

    return res
      .status(200)
      .json({ msg: "Review deleted successfully", deletedReview: reviews });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  getReview,
  getReviews,
  deleteReview
};
