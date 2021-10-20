import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
const UserSchema = new Schema(
  {
    firstname: { type: String, trim: true, min: 2, max: 10, required: true },
    lastname: { type: String, trim: true, min: 2, max: 50, required: true },
    username: { type: String, trim: true, required: true },
    gender: { type: String, default: 'male' },
    address: { type: String, default: null },
    role: { type: String, default: 'user' },
    profilePic: { type: String, default: 'profilePic-default.jpeg' },
    coverPhoto: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)

UserSchema.statics = {
  /**
   * Save user
   * @param { object } user
   */
  createNew(item) {
    return this.create(item)
  },
  /**
   * Get user reference in other collections
   * @param {object} item
   * @param {string} field: column
   */
  getUserRef(item, field) {
    return this.populate(item, {
      path: field,
      select: '-local.password',
    })
  },
  findUserNormalById(userId) {
    return this.findById(userId).select('-local.password').exec()
  },
  findByUserIdAndUpdate(userId, item) {
    return this.findByIdAndUpdate(userId, item, { new: true })
      .select('-local.password')
      .exec()
  },
  /**
   * Find user by username
   * @param {string} username
   */
  findByUsername(username) {
    return this.findOne({ username }).exec()
  },
  /**
   * Find user by email
   * @param {string} email
   */
  findByEmail(email) {
    return this.findOne({ 'local.email': email }).exec()
  },
  findByFacebookUid(uid) {
    return this.findOne({ 'facebook.uid': uid }).exec()
  },
  findByGoogleUid(uid) {
    return this.findOne({ 'google.uid': uid }).exec()
  },
  removeByUserId(userId) {
    return this.findByIdAndRemove(userId).exec()
  },
  verifyToken(token) {
    return this.findOneAndUpdate(
      { 'local.verifyToken': token },
      {
        'local.verifyToken': null,
        'local.isActive': true,
      }
    ).exec()
  },

  findByToken(token) {
    return this.findOne({ 'local.verifyToken': token })
      .select('firstname lastname role')
      .exec()
  },
}

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.local.password)
  },
}

const User = new mongoose.model('User', UserSchema)
export default User
