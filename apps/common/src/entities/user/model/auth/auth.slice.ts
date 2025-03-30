import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import type { AuthData } from './auth.interface';
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './auth.thunks';

interface InitialState {
  authData: AuthData | null;
  isAuth: boolean | null;
}

const initialState: InitialState = {
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
              toast(action.payload, { autoClose: 15000 });
            }
          }
        }
      );
  },
});

export const authReducer = authSlice.reducer;
