import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const DB_NAME = "task_app";
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED: ", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
