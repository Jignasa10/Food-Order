import express from "express";
import { getMenuItems, createMenuItem } from "../controllers/menuController.js";

const router = express.Router();

/**
 * @route   GET /api/menu
 * @desc    Get all menu food items
 */
router.get("/", getMenuItems);

/**
 * @route   POST /api/menu
 * @desc    Add new menu item (admin feature)
 */
router.post("/", createMenuItem);

export default router;
