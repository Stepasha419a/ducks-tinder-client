import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authService } from '@/shared/api/services';
import { API_URL } from '@shared/api';
import type {
  LoginParams,
  RegistrationParams,
} from '@shared/api/services/auth';
import { returnErrorMessage } from '@shared/helpers';
import { setCurrentUser } from '@entities/user/model';
import type { User } from '@shared/api/interfaces';

export const registerThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: RegistrationParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.registration(
        params.email,
        params.name,
        params.password
      );

      dispatch(setCurrentUser(response.data));
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/loginUser',
  async (params: LoginParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login(params.email, params.password);

      dispatch(setCurrentUser(response.data));
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
      // TODO: decompose it into authService
      const response = await axios.get<User>(`${API_URL}auth/refresh`, {
        withCredentials: true,
      });

      dispatch(setCurrentUser(response.data));
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
      await authService.logout();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
