/** @format */

import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/create/post", createPost); // passed
postRouter.get("/get/posts", getPosts); // passed
postRouter.get("/get/post/:postId", getPostById); // passed
postRouter.put("/update/post/:postId", updatePost);

postRouter.delete("/delete/post/:postId", deletePost); // passed

export default postRouter;
