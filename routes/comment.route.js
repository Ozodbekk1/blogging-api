/** @format */

import { Router } from "express";
import {
  deletePostComment,
  writeCommentToPost,
} from "../controller/comment.controller.js";

const commentRoute = Router();

commentRoute.post("/addComment/postId/:postId", writeCommentToPost); // passed
commentRoute.delete(
  "/deleteComment/postId/:postId/commentId/:commentId",
  deletePostComment
); // passed

export default commentRoute;
