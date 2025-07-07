const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Enter a Name..."],
    },
    price: {
      type: Number,
      required: [true, "Must be a number..."],
      min: 0,
      default: 0,
    },
    ratings: {
      type: Number,
      required: [true, "Must be between 0 and 5..."],
      min: 0.0,
      max: 5.0,
      default: 0.0,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required..."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required..."],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
