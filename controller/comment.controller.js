/** @format */

import postScheme from "../models/post.model.js";

const writeCommentToPost = async (req, res) => {
  try {
    const { user_id, username, text } = req.body;

    const post = await postScheme.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user_id,
      username,
      text,
    });

    await post.save();

    return res.status(201).json({ message: "comment added", post });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const deletePostComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await postScheme.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.deleteOne();

    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Comment deleted permanently" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export { writeCommentToPost, deletePostComment };
