const products = require("../models/productsModel");

const addProducts = async (req, res) => {
  try {
    const product = await products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await products.find({});
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await products.findOne({ _id: productID });
    if (!product) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: {productID}` });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;

    const product = await products.findOneAndUpdate(
      { _id: productID },
      req.body,
      { new: true } // Ensures the response contains updated product data
    );

    if (!product) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: ${productID}` });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await products.findOneAndDelete({ _id: productID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const product = await products.find({ category: categoryId });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Product Stock when Purchased
const updateProductStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.stock -= quantity;
    await product.save();
    res.status(200).json({ message: "Stock updated", stock: product.stock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  updateProductStock,
};
