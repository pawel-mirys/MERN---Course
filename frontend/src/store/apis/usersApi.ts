import { USERS_URL } from '@/constants';

import { api } from './api';
import { UserType } from '@/types';

const usersApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation<
        UserType,
        {
          email: string;
          password: string;
        }
      >({
        query: (data) => {
          return {
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data,
          };
        },
      }),
      register: builder.mutation<
        UserType,
        { name: string; email: string; password: string }
      >({
        query: (data) => {
          return {
            url: USERS_URL,
            method: 'POST',
            body: data,
          };
        },
      }),
      logout: builder.mutation<{ message: string }, void>({
        query: () => {
          return {
            url: `${USERS_URL}/logout`,
            method: 'POST',
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApi;

export { usersApi };
