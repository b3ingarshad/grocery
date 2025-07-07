const Category = require("../models/categoryModel");

const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const category = await Category.find({});
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await Category.findOne({ _id: categoryID });
    if (!category) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: {categoryID}` });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryID },
      req.body, // Pass the updated data
      { new: true, runValidators: true } // Return the updated category
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: ${categoryID}` });
    }

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await Category.findOneAndDelete({ _id: categoryID });
    if (!category) {
      return res
        .status(404)
        .json({ msg: `No Data found with id: {categoryID}` });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  getCategories,
  deleteCategory
};
