import express from "express";
import { addToCart, removeFromCart } from "../controllers/CartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);

module.exports = router;