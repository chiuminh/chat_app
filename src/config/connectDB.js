import mongoose from "mongoose";
let uri = `${process.env.DB_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Database connection error " + err);
  }
};

export default connectDB;
