import { createAsyncThunk } from '@reduxjs/toolkit';

import { returnErrorMessage, userService } from '@ducks-tinder-client/common';

import { deletePendingUserId, skipCurrentTinderUser } from './tinder.slice';

export const getMatchUsersThunk = createAsyncThunk(
  'users/getMatchUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        tinder: { tinderUsers, pendingUserIds },
      } = getState() as RootState;

      const take = Math.max(1, 3 - tinderUsers.length);

      const tinderUserIds = tinderUsers.map((user) => user.id);
      const skipUserIds = pendingUserIds.concat(tinderUserIds);

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

      dispatch(skipCurrentTinderUser());

      const response = await userService
        .likeUser(currentUserId)
        .catch((error) => {
          dispatch(deletePendingUserId(currentUserId));
          throw error;
        });

      dispatch(deletePendingUserId(response.data.id));

      if (tinderUsers.length < 4) {
        dispatch(getMatchUsersThunk());
      }

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const returnUserThunk = createAsyncThunk(
  'users/returnUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.returnUser();

      return response.data;
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

      dispatch(skipCurrentTinderUser());

      const response = await userService
        .dislikeUser(currentUserId)
        .catch((error) => {
          dispatch(deletePendingUserId(currentUserId));
          throw error;
        });

      dispatch(deletePendingUserId(response.data.id));

      if (tinderUsers.length < 4) {
        dispatch(getMatchUsersThunk());
      }

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
