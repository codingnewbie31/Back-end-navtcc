import { where } from "sequelize";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
  const body = req.body;
  try{
    // this is used so a person cant enter the same email twice.
    const isExistUser = await User.findOne({where : { email: body.email}})

    if (isExistUser) {
      return res.json({
        status : false,
        messsage : ` ${body.email} already exist`,

      })
    }

    const hashPassword = await bcrypt.hash(body.password,10);
    const user = await User.create({...body, role: "user", password : hashPassword})

    const hygeineUser = {
      id : user.id,
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      role : user.role,
      updatedAt : user.updatedAt,
      createdAt : user.createdAt
    };

    res.json({
      success : true,
      message : "User created successfully",
      data : hygeineUser,
    })
  }catch(error) {
    res.status(500).json({
      success: false,
      message : "internal server error",
      error : error.message 
    })
  }
}

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    res.json({
      success: true,
      message: "Retreive all users successfully",
      data: allUsers,
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
        message: `user not found with this ${userId}`,
      });
    }

    res.json({
      success: true,
      message: `get single user successfully with this ${userId}`,
      data: existUser,
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
        message: `user not found with this ${userId}`,
      });
    }

    const user = await existUser.update(updatedBody);

    res.json({
      success: true,
      message: `user updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Network error`,
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




