import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Order from "./Order";

class OrderItem extends Model {
  public id!: number;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Order, key: "id" },
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    timestamps: true,
  }
);

export default OrderItem;