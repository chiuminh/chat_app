import mongoose, { Schema, SchemaTypes } from "mongoose";

const PostSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweetData: { type: Schema.Types.ObjectId, ref: "Post" },
    replyTo: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true }
);

PostSchema.statics = {
  findPosts(filter) {
    return this.find(filter)
      .populate("postedBy")
      .populate("retweetData")
      .populate("replyTo")
      .sort({ createdAt: 1 })
      .exec();
  },
  findPostById(id) {
    return this.findById(id)
      .populate("postedBy")
      .populate("retweetData")
      .sort({ createdAt: 1 })
      .exec();
  },
  createNew(item) {
    return this.create(item);
  },
  getPostRef(item, field) {
    return this.populate(item, {
      path: field,
    });
  },
  findAndDelete(item) {
    return this.findOneAndDelete(item).exec();
  },
  findPostByIdAndDelete(id) {
    return this.findByIdAndDelete(id).exec();
  },
  removePostById(id) {
    return this.removeById(id).exec();
  },
  findPostByIdAndUpdate(postId, item) {
    return this.findByIdAndUpdate(postId, item, { new: true }).exec();
  },
};

const Post = mongoose.model("Post", PostSchema);
export default Post;
