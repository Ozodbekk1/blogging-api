/** @format */
import postScheme from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body;

    const post = await postScheme.create({
      user_id,
      content,
      likes_count: 0,
      comments: [],
    });

    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await postScheme
      .findById(req.params.postId)
      .populate("user_id")
      .populate("comments.user_id");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const existingPost = await postScheme.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await existingPost.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const writeCommentToPost = async (req, res) => {
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

  res.json(post);
};

const deletePostComment = async (req, res) => {
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

  res.json({ success: true, message: "Comment deleted permanently" });
};

export {
  createPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
  writeCommentToPost,
  deletePostComment,
};
