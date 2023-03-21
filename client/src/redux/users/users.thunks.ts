import {
  ImageInterface,
  PartnerSettings,
  PicturesVariants,
} from '../../models/User/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { usersAPI } from '../../api/users/users.api';
import { User } from '../../models/User/User';
import { RootState } from '../store';
import { ChangedData, InnerObjectName } from '../settings/settings.interfaces';
import {
  makeDataObject,
  makeQuerySortsObj,
  makeUserImagesObject,
} from './utils';

export async function fetchUserById(id: string) {
  const response = await usersAPI.getCurrentUser(id);

  const user = await response.data;

  return user;
}

export const getSortedUserThunk = createAsyncThunk(
  'users/getSortedUser',
  async function (
    args: { user: User; requestedUsers?: string[] },
    { rejectWithValue }
  ) {
    try {
      const querySortsObj = makeQuerySortsObj(args.user, args.requestedUsers);

      const response = await usersAPI.getSortedUsers(querySortsObj);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (
    args: {
      inputName: keyof User | keyof PartnerSettings;
      changedData: ChangedData;
      innerObjectName?: InnerObjectName;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser } = usersPage;
      const data = makeDataObject({ ...args, currentUser });

      const response = await usersAPI.updateUser(currentUser._id, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (pairsId: string[], { rejectWithValue }) => {
    try {
      const pairs = [];
      for await (const pairId of pairsId) {
        const user = await fetchUserById(pairId);
        pairs.push(user);
      }

      return pairs;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const deletePairThunk = createAsyncThunk(
  'users/deletePair',
  async (
    args: { userId: string; deleteForUserId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersAPI.deletePair(
        args.userId,
        args.deleteForUserId
      );

      return { data: response.data, deletedId: args.deleteForUserId };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const saveUserImage = createAsyncThunk(
  'users/saveUserImage',
  async (
    args: { picture: Blob; userId: string; setting: PicturesVariants },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersAPI.savePicture(
        args.picture,
        args.userId,
        args.setting
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const deleteUserImage = createAsyncThunk(
  'users/deleteUserImage',
  async (
    args: {
      pictureName: string;
      setting: PicturesVariants;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { usersPage } = getState() as RootState;
      const {
        currentUser: { _id },
      } = usersPage;

      const response = await usersAPI.deletePicture(
        args.pictureName,
        _id,
        args.setting
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const mixUserImages = createAsyncThunk(
  'users/mixUserImages',
  async (
    args: { currentUser: User; images: ImageInterface[] },
    { rejectWithValue }
  ) => {
    try {
      const userImages = makeUserImagesObject(args.images);

      const response = await usersAPI.updateUser(
        args.currentUser._id,
        userImages
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const likeUserThunk = createAsyncThunk(
  'users/likeUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser, tinderUsers, currentTinderUsersIndex } = usersPage;
      const tinderUser = tinderUsers[currentTinderUsersIndex];

      const data = makeDataObject({
        currentUser: currentUser,
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
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const returnUserThunk = createAsyncThunk(
  'users/returnUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { usersPage } = getState() as RootState;
      const {
        currentUser,
        currentTinderUsersIndex,
        tinderUsers,
        isReturnUser,
      } = usersPage;
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
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const dislikeUserThunk = createAsyncThunk(
  'users/dislikeUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { usersPage } = getState() as RootState;
      const { currentUser, currentTinderUsersIndex, tinderUsers } = usersPage;
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
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);
