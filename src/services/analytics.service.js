import Invoice from "../models/invoice.model.js";

export const getSupplierStatsService = async (req) => {
  const { id: supplierId } = req.params;
  const userId = req.user._id;

  const invoices = await Invoice.find({ supplierId, userId });

  if (!invoices.length) {
    return {
      supplierId,
      totalInvoices: 0,
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
      partiallyPaidAmount: 0,
      paidPercentage: "0.00%",
      unpaidPercentage: "0.00%",
      partiallyPaidPercentage: "0.00%",
    };
  }

  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  const paidAmount = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const unpaidAmount = invoices
    .filter((inv) => inv.status === "unpaid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const partiallyPaidAmount = invoices
    .filter((inv) => inv.status === "partially_paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidCount = invoices.filter((inv) => inv.status === "paid").length;
  const unpaidCount = invoices.filter((inv) => inv.status === "unpaid").length;
  const partiallyPaidCount = invoices.filter(
    (inv) => inv.status === "partially_paid",
  ).length;

  return {
    supplierId,
    totalInvoices,
    totalAmount,
    paidAmount,
    unpaidAmount,
    partiallyPaidAmount,
    paidPercentage: `${((paidCount / totalInvoices) * 100).toFixed(2)}%`,
    unpaidPercentage: `${((unpaidCount / totalInvoices) * 100).toFixed(2)}%`,
    partiallyPaidPercentage: `${((partiallyPaidCount / totalInvoices) * 100).toFixed(2)}%`,
  };
};
