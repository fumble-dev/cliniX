import mongoose from "mongoose";

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
