import { UserType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AuthInitialStateType = {
  userInfo: UserType | null;
};

const initialState: AuthInitialStateType = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;
