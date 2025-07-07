const {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  updateProductStock,
} = require("../controllers/productsControllers");
const express = require("express");
const router = express.Router();

router.route("/").post(addProducts).get(getProducts);
router.put("/update-stock", updateProductStock);
router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
