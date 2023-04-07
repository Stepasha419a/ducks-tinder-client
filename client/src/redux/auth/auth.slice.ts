import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './auth.thunks';

interface InitialState {
  isAuth: boolean | null;
  isLoading: boolean;
  formError: string;
}

const initialState: InitialState = {
  isAuth: null,
  isLoading: false,
  formError: '',
};

type AuthMatcherPayload = { status: string; message: string } | string;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.formError = '';
      })
      .addCase(loginThunk.pending, (state) => {
        state.formError = '';
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.accessToken);
        state.isAuth = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.accessToken);
        state.isAuth = true;
      })
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.accessToken);
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addMatcher(
        (action: PayloadAction) => action.type.endsWith('rejected'),
        (state, action: PayloadAction<AuthMatcherPayload>) => {
          if (action.type.split('/')[0] === 'auth') {
            state.isLoading = false;
            state.isAuth = false;
            if (typeof action.payload === 'string') {
              // not status => not auth check, just form error
              state.formError = action.payload;
            }
          }
        }
      );
  },
});

export default authSlice.reducer;
