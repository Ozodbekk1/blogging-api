/** @format */

// models/Post.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required: true },
  text: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // IMPORTANT ✔
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    likes_count: {
      type: Number,
      default: 0,
    },

    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
