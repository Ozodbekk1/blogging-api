/** @format */

import { Router } from "express";
import { createPost } from "../controller/post.controller.js";

const postRouter = Router();

postRouter.post("/create/post", createPost);

export default postRouter;
