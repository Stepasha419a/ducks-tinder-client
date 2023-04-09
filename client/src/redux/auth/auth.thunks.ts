import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserAuthParams } from '@api/auth/auth.api';
import { authAPI } from '@api/auth/auth.api';
import { API_URL } from '@shared/api';
import type { AuthResponse } from '@shared/api/interfaces';
import { returnErrorMessage } from '@shared/helpers';
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
