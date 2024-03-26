import { Request } from 'express';
import { UserType } from '../types/types';

export interface LoginRequestBody {
  email: string;
  password: string;
}

