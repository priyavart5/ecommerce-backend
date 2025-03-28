import express from "express";
import { placeOrder } from "../controllers/OrderController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/place", protect, placeOrder);

module.exports = router;