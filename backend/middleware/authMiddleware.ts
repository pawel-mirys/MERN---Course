import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect routes

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = process.env.JWT_SECRET;

    let token;
    token = req.cookies.jwt;

    if (!jwtToken) {
      throw new Error('JWT_SECRET env variable is not defined');
    } else {
      if (token) {
        try {
          const decoded = jwt.verify(token, jwtToken) as JwtPayload;
          req.user = await User.findById(decoded.userId).select('-password');
          next();
        } catch (error) {
          console.log(error);
          res.status(401);
          throw new Error('Not authorized, token failed');
        }
      } else {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
    }
  }
);

//admin md

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
