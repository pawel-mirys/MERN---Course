import { PRODUCTS_URL } from '@/constants';

import { api } from './api';
import { ProductType } from '@/types';

const productsApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      getProducts: builder.query<ProductType[], void>({
        query: () => {
          return {
            url: PRODUCTS_URL,
            method: 'GET',
          };
        },
        keepUnusedDataFor: 5,
      }),
    };
  },
});

export const { useGetProductsQuery } = productsApi;

export { productsApi };
