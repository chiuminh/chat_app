import mongoose from "mongoose";
class Database {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(
        "mongodb+srv://minhchiu:Passwordminhch@cluster0.ncsf0.mongodb.net/Chat_App?retryWrites=true&w=majority"
      );
      console.log("Database connection successful");
    } catch (err) {
      console.log("Database connection error " + err);
    }
  }
}
export default new Database();
