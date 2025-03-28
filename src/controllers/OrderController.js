import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {

  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    let totalAmount = 0;
    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");
        totalAmount += product.price * item.quantity;

        return { orderId: "", productId: item.productId, quantity: item.quantity, price: product.price };
      })
    );

    const order = await Order.create({ userId, totalAmount, status: "pending" });

    orderItems.forEach((item) => (item.orderId = order.id));
    await OrderItem.bulkCreate(orderItems);

    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
