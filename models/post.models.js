const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  steps: [
    {
      type: String,
      required: true,
    },
  ],
  photo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  channelname: {
    type: ObjectId,
    ref: "User",
  },
  comment: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

module.exports = Post = mongoose.model("Post", PostSchema);
