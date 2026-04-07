import express from "express";
import {
  validate,
  validateCreateSupplier,
} from "../middlewares/validation.middleware.js";
import {
  createSupplierController,
  deleteSupplierController,
  getAllSuppliersController,
  getSupplierController,
  updateSupplierController,
} from "../controllers/supplier.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router
  .post("/", validateCreateSupplier, validate, createSupplierController)
  .get("/", getAllSuppliersController)
  .get("/:id", getSupplierController)
  .put("/:id", updateSupplierController)
  .delete("/:id", deleteSupplierController);

export default router;
