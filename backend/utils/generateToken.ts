import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET env variable is not defined');
  }

  const token = jwt.sign({ userId: userId }, jwtSecret, {
    expiresIn: '30d',
  });

  //set jwt as http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
  });
};

export default generateToken;
