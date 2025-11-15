/** @format */

import userModel from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, userName, email } = req.body;
    const createdUser = await userModel.create({ name, userName, email });
    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
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
