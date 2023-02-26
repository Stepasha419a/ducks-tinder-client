import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/api';
import { authAPI, UserAuthParams } from '../../api/auth/auth.api';
import { AuthResponse } from '../../models/response/AuthResponse';
import { setCurrentUser } from '../users/users.slice';

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
