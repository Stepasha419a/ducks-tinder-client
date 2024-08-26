import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api';
import { returnErrorMessage } from '@shared/lib';
import { deleteCurrentTinderUser } from './tinder.slice';

export const getMatchUserThunk = createAsyncThunk(
  'users/getMatchUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        tinder: { tinderUsers },
      } = getState() as RootState;

      const take = Math.max(1, 3 - tinderUsers.length);
      const skipUserIds = tinderUsers.length
        ? tinderUsers.map((user) => user.id)
        : undefined;

      const response = await userService.getMatchUsers(take, skipUserIds);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const likeUserThunk = createAsyncThunk(
  'users/likeUser',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { tinder } = getState() as RootState;
      const { tinderUsers } = tinder;

      const currentUserId = tinderUsers[0]?.id;
      if (!currentUserId) {
        return;
      }

      dispatch(deleteCurrentTinderUser());

      await userService.likeUser(currentUserId);

      if (tinderUsers.length < 4) {
        dispatch(getMatchUserThunk());
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
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { tinder } = getState() as RootState;
      const { tinderUsers } = tinder;

      const currentUserId = tinderUsers[0]?.id;
      if (!currentUserId) {
        return;
      }

      dispatch(deleteCurrentTinderUser());

      await userService.dislikeUser(currentUserId);

      if (tinderUsers.length < 4) {
        dispatch(getMatchUserThunk());
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
