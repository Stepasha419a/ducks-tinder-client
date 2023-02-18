import { createSlice } from '@reduxjs/toolkit';
import {
  checkAuthThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './auth.thunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: null as boolean | null,
    isLoading: false as boolean,
    formError: '' as string,
  },
  reducers: {
    setFormError(state, action) {
      state.formError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          if (action.type.split('/')[0] === 'auth') {
            state.isLoading = false;
            state.isAuth = false;
            if (!action.payload.status) {
              // not status => not auth check, just form error
              state.formError = action.payload;
            }
          }
        }
      );
  },
});

export const { setFormError } = authSlice.actions;
export default authSlice.reducer;
