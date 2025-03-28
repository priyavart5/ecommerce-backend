import express from "express";
import { addToCart, removeFromCart } from "../controllers/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);

export default router;