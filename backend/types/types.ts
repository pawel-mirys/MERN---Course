import mongoose from 'mongoose';

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

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
} & UserDocument;

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
  user: UserType;
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: mongoose.Schema.Types.ObjectId;
  }[];
  shippingAdress: {
    adress: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_adress: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
};
