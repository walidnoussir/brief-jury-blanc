import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import supplierRoutes from "./routes/supplier.route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
