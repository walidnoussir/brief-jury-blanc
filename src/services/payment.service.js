import Invoice from "../models/invoice.model.js";
import Payment from "../models/payment.model.js";

export const createPaymentService = async (req) => {
  const { id: invoiceId } = req.params;
  const { amount, paymentDate } = req.body;

  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    throw new Error("INVOICE_NOT_FOUND");
  }

  const lastPayment = await Payment.findOne({ invoiceId }).sort({
    createdAt: -1,
  });

  const previousCurrentAmount = lastPayment ? lastPayment.currentAmount : 0;
  const remaining = invoice.amount - previousCurrentAmount;

  if (amount > remaining) {
    throw new Error("AMOUNT_EXCEEDS_REMAINING_BALANCE");
  }

  const newCurrentAmount = previousCurrentAmount + amount;

  const payment = await Payment.create({
    amount,
    currentAmount: newCurrentAmount,
    paymentDate,
    invoiceId,
    userId: req.user._id,
  });

  const newStatus =
    newCurrentAmount >= invoice.amount ? "paid" : "partially_paid";

  await Invoice.findByIdAndUpdate(invoiceId, { status: newStatus });

  return { payment, invoiceStatus: newStatus };
};

export const getPaymentsService = async (req) => {
  const { id: invoiceId } = req.params;
  const payments = await Payment.find({
    invoiceId,
    userId: req.user._id,
  }).populate("invoiceId", "amount status");

  return payments;
};
