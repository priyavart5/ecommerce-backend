import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { sequelize, connectMongoDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize
.sync({ force: false })
.then(() => console.log("PostgreSQL connected"))
.catch((err) => console.error("Sequelize sync error:", err));

connectMongoDB();

app.use("/api/auth",  authRoutes);
app.use("/api/products",  productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});