import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Use existing connection

  await mongoose.connect(MONGODB_URI, {
    dbName: "saydled",
  });
  console.log("Connected to MongoDB");
};

export default connectDB;
