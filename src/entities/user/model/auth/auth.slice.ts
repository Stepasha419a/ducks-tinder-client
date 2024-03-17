import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './auth.thunks';
import { toast } from 'react-toastify';

interface InitialState {
  isAuth: boolean | null;
}

const initialState: InitialState = {
  isAuth: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addMatcher(
        (action: PayloadAction) => action.type.endsWith('rejected'),
        (state, action: PayloadAction<string>) => {
          if (action.type.split('/')[0] === 'auth') {
            // if it's auth error (refresh request) => set unauthorized
            state.isAuth = false;

            const thunkName = action.type.split('/')[1];
            // if it's auth form error => set error message
            if (thunkName === 'loginUser' || thunkName === 'registerUser') {
              toast(action.payload);
            }
          }
        }
      );
  },
});

export const authReducer = authSlice.reducer;
