/** @format */

import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/create/user", createUser); // passed
userRouter.get("/get/user", getUser); // passed
userRouter.get("/get/user/:userId", getUserById); // passed
userRouter.put("/update/user/:userId", updateUser); // passed
userRouter.delete("/delete/user/:userId", deleteUser); // passed

export default userRouter;
