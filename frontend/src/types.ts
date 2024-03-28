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
  qty: number;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type ReviewType = {
  name: string;
  rating: number;
  comment: string;
  user: UserType;
};

export type ShippingAddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
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
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  isDelivered: boolean;
  deliveredAt: Date;
  isPaid: boolean;
  paidAt: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type CustomError = {
  status: number;
  data: { message: string };
};
