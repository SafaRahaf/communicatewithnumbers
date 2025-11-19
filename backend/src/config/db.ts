import mongoose from "mongoose";

export const connectDB = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
