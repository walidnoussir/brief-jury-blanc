import Supplier from "../models/supplier.model.js";

export const createSupplierService = async (req) => {
  const { name, email, phone, address } = req.body;

  const newSupplier = await Supplier.create({
    name,
    email,
    userId: req.user._id,
    phone,
    address,
  });

  return newSupplier;
};

export const getAllSuppliersService = async (req) => {
  const suppliers = await Supplier.find({ userId: req.user._id });

  return suppliers;
};

export const getSupplierByIdService = async (req) => {
  const { id } = req.params;

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new Error("SUPPLIER_NOT_FOUND");
  }

  return supplier;
};

export const updateSupplierService = async (req) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  const supplier = await Supplier.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { name, email, phone, address },
    { new: true },
  );

  if (!supplier) {
    throw new Error("SUPPLIER_NOT_FOUND");
  }

  return supplier;
};

export const deleteSupplierService = async (req) => {
  const { id } = req.params;

  const supplier = await Supplier.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!supplier) {
    throw new Error("SUPPLIER_NOT_FOUND");
  }

  return supplier;
};
