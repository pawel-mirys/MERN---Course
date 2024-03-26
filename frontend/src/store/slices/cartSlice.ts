import { updateCart } from '@/utils/cartUtils';
import { ProductType, ShippingAddressType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartInitialStateType = {
  cartItems: ProductType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  qty: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

const initialState: CartInitialStateType = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddressType>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
