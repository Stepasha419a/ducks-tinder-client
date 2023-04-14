import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import type {
  ChangedData,
  ImageInterface,
  InnerObjectName,
  PartnerSettings,
  PicturesVariants,
  User,
} from '@shared/api/interfaces';
import { usersAPI } from '@shared/api/users/users.api';
import { makeDataObject } from '@shared/helpers/makeDataObject';
import { returnErrorMessage } from '@shared/helpers';
import { makeUserImagesObject } from './helpers';

export async function fetchUserById(id: string): Promise<User> {
  const response = await usersAPI.getCurrentUser(id);

  const user = response.data;

  return user;
}

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
      const { user } = getState() as RootState;
      const { currentUser } = user;
      const data = makeDataObject({ ...args, currentUser });

      const response = await usersAPI.updateUser(currentUser._id, data);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (pairsId: string[], { rejectWithValue }) => {
    try {
      // TODO: do this server endpoint
      const pairs = await Promise.all(
        pairsId.map(async (pairId) => fetchUserById(pairId))
      ).then((results) => results.map((result) => result));

      return pairs;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const saveUserImageThunk = createAsyncThunk(
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
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
      const { user } = getState() as RootState;
      const {
        currentUser: { _id },
      } = user;

      const response = await usersAPI.deletePicture(
        args.pictureName,
        _id,
        args.setting
      );

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
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
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
