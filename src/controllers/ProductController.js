import Product from "../models/Product.js";
import { validationResult } from "express-validator";

export const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, description, price, category, stock, images } = req.body;
        const product = await Product.create({ name, description, price, category, stock, images, createdBy: req.user.id });

        res.status(201).json({ message: "Product created", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
        const filters = {};
    
        if (search) filters.name = { $regex: search, $options: "i" };
        if (category) filters.category = category;
        if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
        if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };

        const totalProducts = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / Number(limit));
    
        const products = await Product.find(filters)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({ products, totalPages });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
    
        Object.assign(product, req.body);
        await product.save();
    
        res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById({ id: req.params.id });
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};