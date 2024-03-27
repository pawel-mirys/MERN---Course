import { ORDERS_URL } from '@/constants';
import { api } from './api';
import { OrderType } from '@/types';

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
    };
  },
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApi;

export { ordersApi };
