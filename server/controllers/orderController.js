const Order = require("../models/Order");
const Product = require("../models/productsModel");

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentId } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ error: "❌ No products found in the order" });
    }

    // ✅ Validate product IDs exist
    const productIds = products.map((p) => p.productId);
    const validProducts = await Product.find({ _id: { $in: productIds } });

    if (validProducts.length !== products.length) {
      return res.status(400).json({ error: "❌ Some products are invalid" });
    }

    const newOrder = new Order({
      user,
      products,
      amount: totalAmount,
      transactionId: paymentId,
      status: "Processing",
    });

    await newOrder.save();
    return res
      .status(201)
      .json({ message: "✅ Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Order Creation Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all orders

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "products.productId",
      select: "name price imageUrl",
    });

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      products: order.products
        .filter((p) => p.productId) // ✅ Filter out null values
        .map((p) => ({
          productId: p.productId._id,
          name: p.productId.name,
          price: p.productId.price,
          imageUrl: p.productId.imageUrl,
          quantity: p.quantity,
        })),
      amount: order.amount,
      transactionId: order.transactionId,
      status: order.status,
      createdAt: order.createdAt,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
