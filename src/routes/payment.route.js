import express from "express";
import {
  validate,
  validateCreatePayment,
} from "../middlewares/validation.middleware.js";
import {
  createPaymentController,
  getPaymentsController,
} from "../controllers/payment.controller.js";

const router = express.Router();

router
  .post(
    "/:id/payments",
    validateCreatePayment,
    validate,
    createPaymentController,
  )
  .get("/:id/payments", getPaymentsController);

export default router;
