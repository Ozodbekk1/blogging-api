/** @format */
import postScheme from "../models/post.model.js";
import userModel from "../models/user.model.js";

const createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body; // <-- missing in your code

    if (!user_id || !content) {
      return res
        .status(400)
        .json({ message: "user_id and content are required" });
    }

    const existingUser = await userModel.findById(user_id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await postScheme.create({
      user_id,
      content,
      likes_count: 0,
      comments: [],
    });

    return res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await postScheme.find();
    res.status(200).json({
      success: true,
      data: getPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const getPostById = async (req, res) => {
  try {
    const existingPost = await postScheme.findById(req.params.postId);

    if (!existingPost) {
      return res.status(404).json({ message: "post not found" });
    }

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
    return res.status(500).json({ message: "Server error", error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      res.status(400).json({
        success: false,
        data: "content must contain",
      });
    }
    const existingPost = await postScheme.findById(postId);
    if (!existingPost) {
      res.status(400).json({
        success: false,
        data: "post id is incorrect or delted post",
      });
    }

    const updatedPost = await postScheme.findByIdAndUpdate(
      postId,
      { content },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
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

export { createPost, getPosts, getPostById, updatePost, deletePost };
