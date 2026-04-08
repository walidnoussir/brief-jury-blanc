import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

export const createPaymentService = async (req) => {
  const { id: invoiceId } = req.params;
  const { amount, paymentDate } = req.body;

  const invoice = await Invoice.find({ _id: invoiceId });

  if (amount > invoice.amount) {
    throw new Error("Cannot exceed the invoice amount");
  }

  const payment = await Payment.create({
    amount,
    paymentDate,
    invoiceId,
    userId: req.user._id,
  });

  return payment;
};

export const getPaymentsService = async (req) => {
  const payments = await Payment.find({ userId: req.user._id }).populate(
    "invoiceId",
    "amount status",
  );

  return payments;
};
