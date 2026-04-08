import Invoice from "../models/invoice.model.js";
import Supplier from "../models/supplier.model.js";

export const createInvoiceService = async (req) => {
  const { amount, supplierId, duDate, description } = req.body;

  const newInvoice = await Invoice.create({
    amount,
    supplierId,
    duDate,
    description,
    userId: req.user._id,
  });

  return newInvoice;
};

export const getAllInvoicesService = async (req) => {
  const invoices = await Invoice.find({ userId: req.user._id }).populate(
    "supplierId",
    "name email phone",
  );

  return invoices;
};

export const getInvoiceByIdService = async (req) => {
  const { id } = req.params;

  const invoice = await Invoice.find({
    _id: id,
    userId: req.user._id,
  }).populate("supplierId", "name email phone");

  if (!invoice) {
    throw new Error("INVOICE_NOT_FOUND");
  }

  return invoice;
};

export const updateInvoiceService = async (req) => {
  const { id } = req.params;
  const { amount, supplierId, duDate, status, description } = req.body;

  const invoice = await Invoice.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { amount, supplierId, duDate, status, description },
    { new: true },
  );

  if (!invoice) {
    throw new Error("INVOICE_NOT_FOUND");
  }

  return invoice;
};

export const deleteInvoiceService = async (req) => {
  const { id } = req.params;

  const invoice = await Invoice.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!invoice) {
    throw new Error("INVOICE_NOT_FOUND");
  }

  return invoice;
};
