import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  displayname: { type: String, trim: true, min: 2, max: 60, required: true },
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
      max: 50,
      lowercase: true,
    },
    password: { type: String, min: 6, max: 50 },
    isActive: { type: Boolean, default: false },
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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null },
});

UserSchema.statics = {
  /**
   * Save user
   * @param { object } user
   */
  createNew(item) {
    return this.create(item);
  },
  findByUserId(id) {
    return this.findById(id).select("-password").exec();
  },
  /**
   * Find user by email
   * @param {string} email
   */
  findByEmail(email) {
    return this.findOne({ "local.email": email }).exec();
  },
  findByFacebookUid(uid) {
    return this.findOne({ "facebook.uid": uid }).exec();
  },
  findByGoogleUid(uid) {
    return this.findOne({ "google.uid": uid }).exec();
  },
  removeById(id) {
    return this.findByIdAndRemove(id).exec();
  },
  verifyToken(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      {
        "local.verifyToken": null,
        "local.isActive": true,
      }
    ).exec();
  },

  findByToken(token) {
    return this.findOne({ "local.verifyToken": token })
      .select("firstname lastname role")
      .exec();
  },
};

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.local.password);
  },
};

const User = new mongoose.model("User", UserSchema);
export default User;
