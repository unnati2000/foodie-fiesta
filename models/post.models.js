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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: [
    {
      text: String,
      username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = Post = mongoose.model("Post", PostSchema);
