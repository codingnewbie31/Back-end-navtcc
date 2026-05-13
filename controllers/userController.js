import { where } from "sequelize";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../auth/authentication.js";

export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and Password is required",
      });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not registered with this email : ${email}.
                   Please Sign up. `,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({
        status: false,
        message: "Password is Incorrect",
      });
    }

    const excludePassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(user);
    
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
      user: excludePassword,
    });
  } catch (error) {
    console.error("Login error:", error); // empty catch fixed
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const createUser = async (req, res) => {
  const body = req.body;
  try {
    // this is used so a person cant enter the same email twice.
    const isExistUser = await User.findOne({ where: { email: body.email } });

    if (isExistUser) {
      return res.json({
        status: false,
        messsage: ` ${body.email} already exist`,
      });
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      ...body,
      role: "user",
      password: hashPassword,
    });

    const hygeineUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: "User created successfully",
      data: hygeineUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    const safeUsers = allUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    }));

    res.json({
      success: true,
      message: "Retrieved all users successfully",
      data: safeUsers, // ✅ no passwords
    });
  } catch (error) {
    res.json({
      success: false,
      message: "network error",
      error: error.message,
    });
  }
};

export const getSingleUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const existUser = await User.findOne({ where: { id: userId } });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: `user not found with this id of ${userId}`,
      });
    }

    const { password, ...safeUser } = existUser.toJSON();

    res.json({
      success: true,
      message: `get single user successfully with this id : ${userId}`,
      data: safeUser, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Network error`,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedBody = req.body;

    const existUser = await User.findByPk(userId);

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with this ${userId}`,
      });
    }

    // Hash password if it's being updated
    if (updatedBody.password) {
      updatedBody.password = await bcrypt.hash(updatedBody.password, 10);
    }

    await existUser.update(updatedBody);

    // password not returns
    const safeUser = {
      id: existUser.id,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      email: existUser.email,
      role: existUser.role,
      createdAt: existUser.createdAt,
      updatedAt: existUser.updatedAt,
    };

    res.json({
      success: true,
      message: "User updated successfully",
      data: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Network error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existUser = await User.findOne({ where: { id: userId } });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with this ${userId}`,
      });
    }

    await existUser.destroy();
    res.json({
      success: true,
      message: `User deleted successfully with this ${userId}`,
      data: existUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `network error`,
      error: error.message,
    });
  }
};
