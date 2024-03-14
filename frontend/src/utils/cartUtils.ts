import { CartInitialStateType } from '@/store/slices/cartSlice';
import { Draft, produce } from 'immer';

type WritableDraft<T> = {
  [K in keyof T]: Draft<T[K]>;
};

export const addDecimals = (num: number) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: WritableDraft<CartInitialStateType>) => {
  produce(state, (draftState) => {
    draftState.itemsPrice = draftState.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);

    draftState.itemsPrice = addDecimals(draftState.itemsPrice);

    draftState.shippingPrice = addDecimals(
      draftState.itemsPrice > 100 ? 0 : 10
    );

    draftState.taxPrice = parseFloat(
      addDecimals(0.15 * draftState.itemsPrice).toFixed(2)
    );

    draftState.totalPrice = parseFloat(
      (
        draftState.itemsPrice +
        draftState.shippingPrice +
        draftState.taxPrice
      ).toFixed(2)
    );

    localStorage.setItem('cart', JSON.stringify(draftState));
  });

  // Zwróć stan, ale zmieniony przez Immer
  return state;
};
