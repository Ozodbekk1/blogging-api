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
  } catch (error) {
    console.log(error);
  }
};

export { createPost, getPost, getPostById, updatePost, deletePost };
