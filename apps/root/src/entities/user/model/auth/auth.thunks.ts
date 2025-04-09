import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  LoginParams,
  RegistrationParams,
} from '@ducks-tinder-client/common';
import { authService,returnErrorMessage  } from '@ducks-tinder-client/common';


export const registerThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: RegistrationParams, { rejectWithValue }) => {
    try {
      const response = await authService.registration(
        params.email,
        params.name,
        params.password
      );

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
      const response = await authService.login(params.email, params.password);

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
      const response = await authService.refresh();

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
      await authService.logout();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
