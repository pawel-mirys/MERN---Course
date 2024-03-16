import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { UserType } from '../types/types.js';

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  res.send('auth user');
});

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
