import mongoose from "mongoose";

const connectToDB = async () => {
  const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }
  console.log(process.env, "process.env");
  console.log("inside");

  const connectionState = mongoose.connection.readyState;
  if (connectionState == 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  if (connectionState == 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "todo-app",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    throw err;
  }
};

export default connectToDB;
