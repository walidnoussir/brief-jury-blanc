import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    duDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["paid", "unpaid", "partially_paid"],
      default: "unpaid",
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
