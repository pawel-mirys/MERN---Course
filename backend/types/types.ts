import mongoose from 'mongoose';
import { Request } from 'express';

export type ProductType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

interface UserDocument extends Document {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface UserType extends UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type ReviewType = {
  name: string;
  rating: number;
  comment: string;
  user: UserType;
};

export type ProductSchemaType = ProductType & {
  user: UserType;
  reviews: ReviewType;
};

export type OrderType = {
  _id: string;
  user: UserType;
  orderItems: {
    _id: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: mongoose.Schema.Types.ObjectId;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Number;
  isDelivered: boolean;
  deliveredAt: Date;
};
