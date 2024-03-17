import { Request } from 'express';
import { UserType } from '../types/types';

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

export interface GetProfileRequstBody extends Request {
  user?: UserType;
}

export interface UpdateProfileRequestBody extends GetProfileRequstBody {}
