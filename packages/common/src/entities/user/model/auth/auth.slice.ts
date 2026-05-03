import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthData } from './auth.interface';
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './auth.thunks';

export interface AuthInitialState {
  authData: AuthData | null;
  isAuth: boolean | null;
}

const initialState: AuthInitialState = {
  authData: null,
  isAuth: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        registerThunk.fulfilled,
        (state, { payload }: PayloadAction<AuthData>) => {
          state.isAuth = true;
          state.authData = payload;
        }
      )
      .addCase(
        loginThunk.fulfilled,
        (state, { payload }: PayloadAction<AuthData>) => {
          state.isAuth = true;
          state.authData = payload;
        }
      )
      .addCase(
        checkAuthThunk.fulfilled,
        (state, { payload }: PayloadAction<AuthData>) => {
          state.isAuth = true;
          state.authData = payload;
        }
      )
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuth = false;
        state.authData = null;
      })
      .addMatcher(
        (action: PayloadAction) => action.type.endsWith('rejected'),
        (state, action: PayloadAction<string>) => {
          if (action.type.split('/')[0] === 'auth') {
            // if it's auth error (refresh request) => set unauthorized
            state.isAuth = false;
            state.authData = null;

            const thunkName = action.type.split('/')[1];
            // if it's auth form error => set error message
            if (thunkName === 'loginUser' || thunkName === 'registerUser') {
              // TODO: show 401 error with i18n keys mapping, fix prod 401 oauth response (overrides error message from auth-service)
              toast(action.payload, { autoClose: 15000 });
            }
          }
        }
      );
  },
});

export const authReducer = authSlice.reducer;
