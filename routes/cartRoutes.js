import express from "express";
import { addToCart, removeFromCart, getCartItems } from "../controllers/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getCartItems)
router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);

export default router;