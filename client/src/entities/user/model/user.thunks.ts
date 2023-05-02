import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const getUserFirstPairThunk = createAsyncThunk(
  'users/getUserFirstPair',
  async (pairId: string, { rejectWithValue }) => {
    try {
      const pair = await fetchUserById(pairId);

      return pair;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (_, { rejectWithValue, getState }) => {
    try {
      // TODO: do this server endpoint
      const { user } = getState() as RootState;
      const { currentUser } = user;
      const pairs = await Promise.all(
        currentUser.pairs.map(async (pairId) => fetchUserById(pairId))
      ).then((results) => results.map((result) => result));

      return pairs;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deletePairThunk = createAsyncThunk(
  'users/deletePair',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentUser, currentPair } = user;
      const response = await usersAPI.deletePair(
        currentUser._id,
        currentPair!._id
      );

      return { data: response.data, deletedId: currentPair!._id };
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const saveUserImageThunk = createAsyncThunk(
  'users/saveUserImage',
  async (
    args: { picture: Blob; pictureVariant: PicturesVariants },
    { rejectWithValue, getState }
  ) => {
    try {
      const { user } = getState() as RootState;
      const currentUserId = user.currentUser._id;
      const response = await usersAPI.savePicture(
        args.picture,
        currentUserId,
        args.pictureVariant
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
  async (images: ImageInterface[], { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const currentUserId = user.currentUser._id;

      const userImages = makeUserImagesObject(images);
      const response = await usersAPI.updateUser(currentUserId, userImages);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
