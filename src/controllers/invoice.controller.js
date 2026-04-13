import {
  createInvoiceService,
  deleteInvoiceService,
  getAllInvoicesService,
  getInvoiceByIdService,
  getOverdueInvoicesService,
  updateInvoiceService,
} from "../services/invoice.service.js";

export const createInvoiceController = async (req, res) => {
  try {
    const newInvoice = await createInvoiceService(req);

    res
      .status(201)
      .json({ message: "invoice created successfully.", newInvoice });
  } catch (error) {
    console.log("Error on createInvoice controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllInvoicesController = async (req, res) => {
  try {
    const invoices = await getAllInvoicesService(req);

    res.status(200).json({ invoices });
  } catch (error) {
    console.log("Error on getAllInvoices controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getInvoiceByIdController = async (req, res) => {
  try {
    const invoice = await getInvoiceByIdService(req);

    res.status(200).json({ invoice });
  } catch (error) {
    if (error.message === "INVOICE_NOT_FOUND") {
      return res.status(404).json({ message: "Invoice not found." });
    }

    console.log("Error on getInvoiceById controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateInvoiceController = async (req, res) => {
  try {
    const updatedInvoice = await updateInvoiceService(req);

    res
      .status(200)
      .json({ message: "Invoice updated successfully.", updatedInvoice });
  } catch (error) {
    if (error.message === "INVOICE_NOT_FOUND") {
      return res.status(404).json({ message: "Invoice not found." });
    }

    if (error.message === "Cannot modify a paid invoice") {
      return res.status(400).json({ message: "Cannot modify a paid invoice." });
    }

    console.log("Error on updateInvoice controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInvoiceController = async (req, res) => {
  try {
    const deletedInvoice = await deleteInvoiceService(req);

    res
      .status(200)
      .json({ message: "Invoice deleted successfully.", deletedInvoice });
  } catch (error) {
    if (error.message === "INVOICE_NOT_FOUND") {
      return res.status(404).json({ message: "Invoice not found." });
    }

    if (error.message === "Cannot delete a partially_paid invoice") {
      return res
        .status(404)
        .json({ message: "Cannot delete a partially_paid invoice." });
    }

    console.log("Error on deleteInvoice controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOverdueInvoicesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const invoices = await getOverdueInvoicesService(userId);

    res.status(200).json(invoices);
  } catch (error) {
    console.log("Error on getOverdueInvoicesController.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
