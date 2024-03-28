import { ORDERS_URL, PAYPAL_URL } from '@/constants';
import { api } from './api';
import { OrderType } from '@/types';
import { OrderResponseBody } from '@paypal/paypal-js';

const ordersApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      createOrder: builder.mutation<OrderType, OrderType>({
        query: (order) => {
          return {
            url: ORDERS_URL,
            method: 'POST',
            body: { ...order },
          };
        },
      }),
      getOrderDetails: builder.query<OrderType, { orderId: string }>({
        query: ({ orderId }) => {
          return {
            url: `${ORDERS_URL}/${orderId}`,
            method: 'GET',
          };
        },
        keepUnusedDataFor: 5,
      }),
      payOrder: builder.mutation<
        OrderType,
        { orderId: string; details: OrderResponseBody }
      >({
        query: ({ orderId, details }) => {
          return {
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: 'PUT',
            body: { ...details },
          };
        },
      }),
      getPayPalClitendId: builder.query<{ clientId: string }, void>({
        query: () => {
          return {
            url: PAYPAL_URL,
            method: 'GET',
          };
        },
        keepUnusedDataFor: 5,
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClitendIdQuery,
} = ordersApi;

export { ordersApi };
