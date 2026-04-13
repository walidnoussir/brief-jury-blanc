import express from "express";
import {
  validate,
  validateCreateInvoice,
  validateUpdateInvoice,
} from "../middlewares/validation.middleware.js";
import {
  createInvoiceController,
  deleteInvoiceController,
  getAllInvoicesController,
  getInvoiceByIdController,
  getOverdueInvoicesController,
  updateInvoiceController,
} from "../controllers/invoice.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router
  .post("/", validateCreateInvoice, validate, createInvoiceController)
  .get("/", getAllInvoicesController)
  .get("/overdue", getOverdueInvoicesController)
  .get("/:id", getInvoiceByIdController)
  .put("/:id", validateUpdateInvoice, validate, updateInvoiceController)
  .delete("/:id", deleteInvoiceController);

export default router;
