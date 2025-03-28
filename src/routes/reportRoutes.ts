import express from "express";
import { getSalesReport, getUserReport, getProductReport } from "../controllers/ReportController";
import { protect, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/sales", protect, isAdmin, getSalesReport);
router.get("/users", protect, isAdmin, getUserReport);
router.get("/products", protect, isAdmin, getProductReport);

module.exports = router;