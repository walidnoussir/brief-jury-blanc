import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongodb connected  : ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection error:", error);
  }
};
