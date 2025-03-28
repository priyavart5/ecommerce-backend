import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Order extends Model {
  public id!: number;
  public userId!: string;
  public totalAmount!: number;
  public status!: string;
}

Order.init(
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
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
