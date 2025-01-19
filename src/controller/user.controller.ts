import mongoose from "mongoose";
import User, { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/Asynchandle";
import { Request, Response } from "express";

const generateTokens = async (userId: mongoose.Types.ObjectId) => {
    try {
      const user = await User.findById(userId) as IUser;
      if (!user) throw new ApiError(404, "User not found");
  
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(500, "Error while generating tokens");
    }
  };

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const {username,email,password}=req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "Username, email, and password are required");
    }
    const existingUser = await User.findOne({
        $or: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() }
        ]
      });
    
      if (existingUser) {
        const field = existingUser.username === username.toLowerCase() ? 'username' : 'email';
        throw new ApiError(409, `User with this ${field} already exists`);
      }

    const newUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
    });

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Error while creating user");
      }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
})
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
  
    if ((!email && !username) || !password) {
      throw new ApiError(400, "Email/username and password are required");
    }
  
    const user = await User.findOne({
      $or: [{ email: email?.toLowerCase() }, { username: username?.toLowerCase() }]
    });
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id  as mongoose.Types.ObjectId);
  
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "Login successful"
        )
      );
  });
  
  
export {registerUser,loginUser};