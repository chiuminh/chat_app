import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    firstname: { type: String, trim: true, min: 2, max: 10, required: true },
    lastname: { type: String, trim: true, min: 2, max: 50, required: true },
    gender: { type: String, default: "male" },
    address: { type: String, default: null },
    role: { type: String, default: "user" },
    profilePic: { type: String, default: "profilePic-default.jpg" },
    local: {
      email: {
        type: String,
        trim: true,
        min: 2,
        max: 50,
        unique: true,
        lowercase: true,
        required: true,
      },
      password: { type: String, min: 6, max: 50, required: true },
      isActive: { type: String, default: false },
      verifyToken: String,
    },
    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true, lowerCase: true },
    },
    google: {
      uid: String,
      token: String,
      email: { type: String, trim: true, lowerCase: true },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics = {
  /**
   * Save user
   * @param { object } user
   */
  createNew(item) {
    return this.create(item);
  },

  /**
   * Find user by email
   * @param {string} email
   */
  findByEmail(email) {
    return this.findOne({ "local.email": email }).exec();
  },
};

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

const User = new mongoose.model("User", UserSchema);
export default User;
