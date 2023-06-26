import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/shared/api/services';
import type {
  LoginParams,
  RegistrationParams,
} from '@shared/api/services/auth';
import { returnErrorMessage } from '@shared/helpers';
import { setCurrentUser } from '@entities/user/model';

export const registerThunk = createAsyncThunk(
  'auth/registerUser',
  async (params: RegistrationParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.registration(
        params.email,
        params.name,
        params.password
      );
      localStorage.setItem('accessToken', response.data.accessToken);

      dispatch(setCurrentUser(response.data.user));
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
      localStorage.setItem('accessToken', response.data.accessToken);

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
      console.log('asdasdas');
      const response = await authService.refresh();
      localStorage.setItem('accessToken', response.data.accessToken);

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
      await authService.logout();
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
