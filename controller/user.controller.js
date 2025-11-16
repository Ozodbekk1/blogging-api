/** @format */

import userModel from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, userName, email } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User name or email already taken",
      });
    }

    const createdUser = await userModel.create({ name, userName, email });

    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getUser, getUserById, updateUser, deleteUser };
