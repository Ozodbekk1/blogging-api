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
    const getUser = await userModel.find();
    res.status(200).json({
      success: true,
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "user with this id not found" });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, userName } = req.body;
    const { userId } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, userName },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        data: "user already deleted or id not found !",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export { createUser, getUser, getUserById, updateUser, deleteUser };
