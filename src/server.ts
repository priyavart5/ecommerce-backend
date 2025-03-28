const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { sequelize, connectMongoDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize
  .sync({ force: false })
  .then(() => console.log("PostgreSQL Synced"))
  .catch((err: any) => console.error("Sequelize sync error:", err));
  
connectMongoDB();

app.use("/api/auth",  authRoutes);
app.use("/api/products",  productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});