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
      getProductDetails: builder.query<
        ProductType,
        { productId: string | undefined }
      >({
        query: ({ productId }) => {
          return {
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'GET',
          };
        },
        keepUnusedDataFor: 5,
      }),
      createProduct: builder.mutation<ProductType, void>({
        query: () => {
          return {
            url: PRODUCTS_URL,
            method: 'POST',
          };
        },
        invalidatesTags: ['Product'],
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productsApi;

export { productsApi };
