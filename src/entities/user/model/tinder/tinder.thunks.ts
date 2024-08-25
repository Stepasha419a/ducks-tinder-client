import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ShortUser } from '@shared/api';
import { userService } from '@shared/api';
import { returnErrorMessage } from '@shared/lib';

export const getMatchUserThunk = createAsyncThunk(
  'users/getMatchUser',
  async (_, { rejectWithValue }) => {
    try {
      /* const {
        tinder: { tinderUsers },
      } = getState() as RootState;

      const take = Math.max(1, 3 - tinderUsers.length);
      const skipUserIds = tinderUsers.length
        ? tinderUsers.map((user) => user.id)
        : undefined; */

      //const response = await userService.getMatchUsers(take, skipUserIds);
      const response = await userService.getMatchUsers(1);

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

      const currentUser = tinderUsers[0] as ShortUser | undefined;
      if (currentUser) {
        await userService.likeUser(currentUser.id);
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

      const currentUser = tinderUsers[0] as ShortUser | undefined;
      if (currentUser) {
        await userService.dislikeUser(currentUser.id);
        dispatch(getMatchUserThunk());
      }
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
