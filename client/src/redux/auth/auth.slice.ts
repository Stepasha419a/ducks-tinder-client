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
        (state, action: PayloadAction<string>) => {
          if (action.type.split('/')[0] === 'auth') {
            // if it's auth error (refresh request) => set unauthorized
            state.isLoading = false;
            state.isAuth = false;

            const thunkName = action.type.split('/')[1];
            // if it's auth form error => set error message
            if (thunkName === 'loginUser' || thunkName === 'registerUser') {
              state.formError = action.payload;
            }
          }
        }
      );
  },
});

export default authSlice.reducer;
