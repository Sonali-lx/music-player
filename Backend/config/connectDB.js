import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
// there is online mongoDB, MySQL and so many more, in order to not to change it multipple times
// we keep it inside the .env file

export default connectDB;
