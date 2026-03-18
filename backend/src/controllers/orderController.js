import Order from "../models/Order.js";
import { io } from "../../server.js";

/**
 * ✅ Place New Order
 * POST /api/orders
 */
export const placeOrder = async (req, res) => {
  try {
    const { items, customer,totalAmount } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty. Please add items before placing an order.",
      });
    }

    if (!customer?.name || !customer?.address || !customer?.phone) {
      return res.status(400).json({
        message: "Customer details are required (name, address, phone).",
      });
    }

    // Create Order
    const newOrder = await Order.create({
      items,
      customer,
      totalAmount,
      status: "Order Received",
    });

    // Emit Socket Event (Real-time)
    io.emit("newOrderPlaced", newOrder);

    res.status(201).json({
      message: "Order placed successfully ✅",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error ❌",
      error: error.message,
    });
  }
};

/**
 * ✅ Get All Orders
 * GET /api/orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders ❌",
      error: error.message,
    });
  }
};

/**
 * ✅ Get Order By ID
 * GET /api/orders/:id
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found ❌",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order ❌",
      error: error.message,
    });
  }
};

/**
 * ✅ Update Order Status + Real-Time Socket Update
 * PATCH /api/orders/:id/status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Allowed Status Values
    const validStatuses = [
      "Order Received",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed: ${validStatuses.join(", ")}`,
      });
    }

    // Update Order
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found ❌",
      });
    }

    // Emit Real-time Status Update
   // io.emit("orderStatusUpdated", updatedOrder);
    io.to(updatedOrder._id.toString()).emit("statusUpdated", status);

    res.status(200).json({
      message: "Order status updated successfully ✅",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status ❌",
      error: error.message,
    });
  }
};

/**
 * ✅ Delete Order (Optional Feature)
 * DELETE /api/orders/:id
 */
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found ❌",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order ❌",
      error: error.message,
    });
  }
};
