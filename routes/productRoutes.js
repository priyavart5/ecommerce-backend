import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post(
  "/",
  protect,
  isAdmin,
  [body("name").notEmpty(), body("price").isFloat({ min: 0 }), body("category").notEmpty(), body("stock").isInt({ min: 0 })],
  createProduct
);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
