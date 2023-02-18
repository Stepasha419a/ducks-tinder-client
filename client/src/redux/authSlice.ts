import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../api/api';
import { authAPI, UserAuthParams } from '../api/authApi';
import { AuthResponse } from '../models/response/AuthResponse';
import { setCurrentUser } from './users/users.slice';

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

export const registerThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: UserAuthParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.registration(
        params.email,
        params.name,
        params.password
      );

      dispatch(setCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/loginUser',
  async (params: UserAuthParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.login(params.email, params.password);

      dispatch(setCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const checkAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}auth/refresh`, {
        withCredentials: true,
      });

      dispatch(setCurrentUser(response.data.user));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return rejectWithValue({
          message: error.message,
          status: error.response?.status,
        });
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const { setFormError } = authSlice.actions;
export default authSlice.reducer;
