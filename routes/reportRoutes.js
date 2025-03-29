import express from "express";
import { getSalesReport, getUserReport, getProductReport } from "../controllers/ReportController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sales", protect, isAdmin, getSalesReport);
router.get("/users", protect, isAdmin, getUserReport);
router.get("/products", protect, isAdmin, getProductReport);

export default router;