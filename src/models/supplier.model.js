import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },
  },
  { timestamps: true },
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
