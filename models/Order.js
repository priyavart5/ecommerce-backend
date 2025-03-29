import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
