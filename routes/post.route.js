/** @format */

import { Router } from "express";
import {
  createPost,
  deletePost,
  deletePostComment,
  getPost,
  writeCommentToPost,
} from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/create/post", createPost);
postRouter.delete("/:postId", deletePost);
postRouter.post("/:postId/comments", writeCommentToPost);
postRouter.delete("/:postId/comments/:commentId", deletePostComment);
postRouter.get("/:postId", getPost);

export default postRouter;
