import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = URI && (await mongoose.connect(URI));
    console.log(`MongoDB Connected ${conn && conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
