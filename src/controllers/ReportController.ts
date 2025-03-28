import { Request, Response } from "express";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import User from "../models/User";
import Product from "../models/Product";
import { sequelize } from "../config/db";

export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await Order.sum("totalAmount");
    const totalOrders = await Order.count();
    const bestSellingProducts = await OrderItem.findAll({
      attributes: ["productId", [sequelize.fn("SUM", sequelize.col("quantity")), "totalSold"]],
      group: ["productId"],
      order: [[sequelize.literal("totalSold"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ totalRevenue, totalOrders, bestSellingProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales report" });
  }
};

export const getUserReport = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.count();
    const topCustomers = await Order.findAll({
      attributes: ["userId", [sequelize.fn("SUM", sequelize.col("totalAmount")), "totalSpent"]],
      group: ["userId"],
      order: [[sequelize.literal("totalSpent"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ totalUsers, topCustomers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user report" });
  }
};

export const getProductReport = async (req: Request, res: Response) => {
  try {
    const mostPurchasedProducts = await OrderItem.findAll({
      attributes: ["productId", [sequelize.fn("SUM", sequelize.col("quantity")), "totalSold"]],
      group: ["productId"],
      order: [[sequelize.literal("totalSold"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ mostPurchasedProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product report" });
  }
};
