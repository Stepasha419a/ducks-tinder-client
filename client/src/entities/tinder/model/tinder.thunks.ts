import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api/services';
import { makeDataObject, returnErrorMessage } from '@shared/helpers';
import { makeQuerySortsObj } from './helpers';

export const getSortedUserThunk = createAsyncThunk(
  'users/getSortedUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user, tinder } = getState() as RootState;
      const currentUser = user.currentUser;
      const requestedUsers = tinder.requestedUsers;

      const querySortsObj = makeQuerySortsObj(currentUser, requestedUsers);

      const response = await userService.getSortedUser(querySortsObj);

      return { tinderUser: response.data, checkedUsers: currentUser.checkedUsers };
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

      await userService.createPair(tinderUser._id, currentUser._id);

      const updateUserResponse = await userService.updateUser(
        currentUser._id,
        data
      );

      return updateUserResponse.data;
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

        const response = await userService.updateUser(currentUser._id, data);

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

      const response = await userService.updateUser(currentUser._id, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
