import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import invoiceRoutes from "./routes/invoice.route.js";
import paymentRoutes from "./routes/payment.route.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invoices", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
