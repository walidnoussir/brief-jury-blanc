import {
  createPaymentService,
  getPaymentsService,
} from "../services/payment.service.js";

export const createPaymentController = async (req, res) => {
  try {
    const { payment, invoiceStatus } = await createPaymentService(req);

    res.status(201).json({
      message: "Payment created successfully.",
      payment,
      invoiceStatus,
    });
  } catch (error) {
    if (error.message === "INVOICE_NOT_FOUND") {
      return res.status(404).json({ message: "Invoice not found." });
    }

    if (error.message === "AMOUNT_EXCEEDS_REMAINING_BALANCE") {
      return res
        .status(400)
        .json({ message: "Amount exceeds the remaining invoice balance." });
    }

    console.log("Error on createPayment controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPaymentsController = async (req, res) => {
  try {
    const payments = await getPaymentsService(req);

    res.status(200).json({ total: payments.length, payments });
  } catch (error) {
    console.log("Error on getPayments controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
