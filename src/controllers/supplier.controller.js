import { getSupplierStatsService } from "../services/analytics.service.js";
import {
  createSupplierService,
  deleteSupplierService,
  getAllSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
} from "../services/supplier.service.js";

export const createSupplierController = async (req, res) => {
  try {
    const newSupplier = await createSupplierService(req);

    res
      .status(201)
      .json({ message: "New Supplier created successfully.", newSupplier });
  } catch (error) {
    console.log("Error on createSupplier controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllSuppliersController = async (req, res) => {
  try {
    const suppliers = await getAllSuppliersService(req);

    res.status(200).json(suppliers);
  } catch (error) {
    console.log("Error on getAllSuppliers controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSupplierController = async (req, res) => {
  try {
    const supplier = await getSupplierByIdService(req);

    res.status(200).json({ supplier });
  } catch (error) {
    if (error.message === "SUPPLIER_NOT_FOUND") {
      return res.status(404).json({ message: "Supplier not found." });
    }
    console.log("Error on getSupplier controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSupplierController = async (req, res) => {
  try {
    const supplier = await updateSupplierService(req);

    res
      .status(200)
      .json({ message: "Supplier updated successfully.", supplier });
  } catch (error) {
    if (error.message === "SUPPLIER_NOT_FOUND") {
      return res.status(404).json({ message: "Supplier not found." });
    }
    console.log("Error on getSupplier controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSupplierController = async (req, res) => {
  try {
    const supplier = await deleteSupplierService(req);

    res
      .status(200)
      .json({ message: "Supplier deleted successfully.", supplier });
  } catch (error) {
    if (error.message === "SUPPLIER_NOT_FOUND") {
      return res.status(404).json({ message: "Supplier not found." });
    }
    console.log("Error on getSupplier controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSupplierStatsController = async (req, res) => {
  try {
    const stats = await getSupplierStatsService(req);

    res
      .status(200)
      .json({ message: "Supplier stats fetched successfully.", stats });
  } catch (error) {
    console.log("Error on getSupplierStats controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
