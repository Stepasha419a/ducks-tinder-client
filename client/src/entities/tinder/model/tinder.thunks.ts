import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import { usersAPI } from '@shared/api/users/users.api';
import { makeDataObject, returnErrorMessage } from '@shared/helpers';
import type { RootState } from '@app/store';
import { makeQuerySortsObj } from './helpers';

export const getSortedUserThunk = createAsyncThunk(
  'users/getSortedUser',
  async (
    args: { user: User; requestedUsers?: string[] },
    { rejectWithValue }
  ) => {
    try {
      const querySortsObj = makeQuerySortsObj(args.user, args.requestedUsers);

      const response = await usersAPI.getSortedUsers(querySortsObj);

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
      const { user, tinder } = getState() as RootState;
      const { currentUser } = user;
      const { tinderUsers, currentTinderUsersIndex } = tinder;
      const tinderUser = tinderUsers[currentTinderUsersIndex];

      const data = makeDataObject({
        currentUser,
        inputName: 'checkedUsers',
        changedData: [...currentUser.checkedUsers, tinderUser._id],
      });

      const updateUserResponse = await usersAPI.updateUser(
        currentUser._id,
        data
      );

      const createPairResponse = await usersAPI.createPair(
        tinderUser._id,
        currentUser._id
      );

      return {
        ...updateUserResponse.data,
        checkedUsers: [...createPairResponse.data.checkedUsers],
      };
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const returnUserThunk = createAsyncThunk(
  'users/returnUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user, tinder } = getState() as RootState;
      const { currentUser } = user;
      const { currentTinderUsersIndex, tinderUsers, isReturnUser } = tinder;

      if (currentTinderUsersIndex && isReturnUser) {
        const newCheckedUsers = [...currentUser.checkedUsers];
        const index = currentUser.checkedUsers.findIndex(
          (item) => item === tinderUsers[currentTinderUsersIndex - 1]._id
        );

        newCheckedUsers.splice(index, 1);

        const data = makeDataObject({
          currentUser,
          inputName: 'checkedUsers',
          changedData: newCheckedUsers,
        });

        const response = await usersAPI.updateUser(currentUser._id, data);

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
      const { user, tinder } = getState() as RootState;
      const { currentUser } = user;
      const { tinderUsers, currentTinderUsersIndex } = tinder;

      const data = makeDataObject({
        currentUser,
        inputName: 'checkedUsers',
        changedData: [
          ...currentUser.checkedUsers,
          tinderUsers[currentTinderUsersIndex]._id,
        ],
      });

      const response = await usersAPI.updateUser(currentUser._id, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);