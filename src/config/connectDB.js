import mongoose from "mongoose";
const dbConnection = process.env.DB_CONNECTION;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
// let uri = `${dbConnection}://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
let uri = `${dbConnection}://${dbHost}:${dbPort}/${dbName}`;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connection successful".bold.yellow);
  } catch (err) {
    console.log("Database connection error " + err);
  }
};

export default connectDB;
