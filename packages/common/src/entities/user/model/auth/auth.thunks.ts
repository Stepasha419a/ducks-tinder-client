import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  serviceGetter,
  type LoginParams,
  type RegistrationParams,
} from '@shared/api';
import { returnErrorMessage } from '@shared/lib';

export const registerThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: RegistrationParams, { rejectWithValue }) => {
    try {
      const response = await serviceGetter
        .getAuthService()
        .registration(params.email, params.name, params.password);

      const { accessToken, ...data } = response.data;
      localStorage.setItem('accessToken', accessToken);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/loginUser',
  async (params: LoginParams, { rejectWithValue }) => {
    try {
      const response = await serviceGetter
        .getAuthService()
        .login(params.email, params.password);

      const { accessToken, ...data } = response.data;
      localStorage.setItem('accessToken', accessToken);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const checkAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceGetter.getAuthService().refresh();

      const { accessToken, ...data } = response.data;
      localStorage.setItem('accessToken', accessToken);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await serviceGetter.getAuthService().logout();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
