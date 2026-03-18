import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Place a new order
 */
router.post("/", placeOrder);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin)
 */
router.get("/", getAllOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order details by ID
 */
router.get("/:id", getOrderById);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (Preparing, Out for Delivery)
 */
router.patch("/:id/status", updateOrderStatus);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order (Optional)
 */
router.delete("/:id", deleteOrder);

export default router;
