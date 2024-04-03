import { CartInitialStateType } from '@/store/slices/cartSlice';
import { Draft } from 'immer';

type WritableDraft<T> = {
  [K in keyof T]: Draft<T[K]>;
};

export const addDecimals = (num: number) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: WritableDraft<CartInitialStateType>) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
