import mongoose from 'mongoose';
import { UserType } from '../types/types';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (eneterPassword: string) {
  return await bcrypt.compare(eneterPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
