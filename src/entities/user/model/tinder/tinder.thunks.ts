import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api';
import { returnErrorMessage } from '@shared/lib';

export const getMatchUserThunk = createAsyncThunk(
  'users/getMatchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getMatchUser();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const likeUserThunk = createAsyncThunk(
  'users/likeUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { tinder } = getState() as RootState;
      const { tinderUser } = tinder;

      if (tinderUser) {
        await userService.likeUser(tinderUser.id);
        const response = await userService.getMatchUser();
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const returnUserThunk = createAsyncThunk(
  'users/returnUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { tinder } = getState() as RootState;
      const { isReturnUser } = tinder;

      if (isReturnUser) {
        const response = await userService.returnUser();

        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const dislikeUserThunk = createAsyncThunk(
  'users/dislikeUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { tinder } = getState() as RootState;
      const { tinderUser } = tinder;

      if (tinderUser) {
        await userService.dislikeUser(tinderUser.id);
        const response = await userService.getMatchUser();
        return response.data;
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
