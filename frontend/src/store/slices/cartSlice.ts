import { produce } from 'immer';
import { ProductType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartInitialStateType = {
  cartItems: ProductType[];
  qty: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

const addDecimals = (num: number) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

const initialState: CartInitialStateType = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')!)
  : { cartItems: [] };

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

      state = produce(state, (draftState) => {
        draftState.itemsPrice = draftState.cartItems.reduce((acc, item) => {
          return acc + item.price * item.qty;
        }, 0);

        state.itemsPrice = addDecimals(state.itemsPrice);
      });
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      state.taxPrice = parseFloat(
        addDecimals(0.15 * state.itemsPrice).toFixed(2)
      );

      state.totalPrice = parseFloat(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
