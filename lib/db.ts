import mongoose from "mongoose";

const MONGODB_URI: string =
  process.env.MONGODB_URI ||
  "mongodb+srv://sahilmullathil:AkLNtKpElEQ1qqCv@cluster0.b3xvg.mongodb.net/?retryWrites=true&w=majority";
console.log(MONGODB_URI, "MONGODB_URI");

const connectToDB = async () => {
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
