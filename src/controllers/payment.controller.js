import {
  createPaymentService,
  getPaymentsService,
} from "../services/payment.service.js";

export const createPaymentController = async (req, res) => {
  try {
    const payment = await createPaymentService(req);

    res.status(201).json({
      message: "Payment created successfully.",
      payment,
    });
  } catch (error) {
    if (error.message === "Cannot exceed the invoice amount") {
      res.status(400).json({ message: "Cannot exceed the invoice amount" });
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
