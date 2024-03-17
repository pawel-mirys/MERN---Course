import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { UserType } from '../types/types.js';
import { LoginRequestBody } from '../interfaces/userControllersInterfaces.js';
import { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

const loginUser = asyncHandler(
  async (
    req: Request<any, any, LoginRequestBody>,
    res: Response<{ user: UserType }>
  ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET env variable is not defined');
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: '30d',
      });

      //set jwt as http-only cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
      });

      res.json({
        user: user.toObject(),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('register user');
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('logout user');
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('get user profile');
});

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.send('update user profile');
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  res.send('get use by id');
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send('get users');
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('delete user');
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('update user ');
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
