import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';

export const getSortedUserThunk = createAsyncThunk(
  'users/getSortedUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getSortedUser();

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
      const { tinderUsers, currentTinderUsersIndex } = tinder;
      const tinderUser = tinderUsers[currentTinderUsersIndex];

      const response = await userService.likeUser(tinderUser.id);

      return response.data;
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
      const { currentTinderUsersIndex, isReturnUser } = tinder;

      if (currentTinderUsersIndex && isReturnUser) {
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
      const { tinderUsers, currentTinderUsersIndex } = tinder;

      const response = await userService.dislikeUser(
        tinderUsers[currentTinderUsersIndex].id
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
