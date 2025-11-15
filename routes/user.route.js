/** @format */

import { Router } from "express";
import { createUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/create/user", createUser);

export default userRouter;
