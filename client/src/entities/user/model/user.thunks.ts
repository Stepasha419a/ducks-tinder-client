import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  ChangedData,
  InnerObjectName,
  User,
} from '@shared/api/interfaces';
import { userService } from '@shared/api/services';
import { makeDataObject } from '@shared/helpers/makeDataObject';
import { returnErrorMessage } from '@shared/helpers';

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (
    args: {
      inputName: keyof User;
      changedData: ChangedData;
      innerObjectName?: InnerObjectName;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const { user } = getState() as RootState;
      const { currentUser } = user;
      const data = makeDataObject({ ...args, currentUser });

      const response = await userService.updateUser(data);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const updateUserPlaceThunk = createAsyncThunk(
  'users/updateUserPlace',
  async (
    args: {
      latitude: number;
      longitude: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUserPlace(
        args.latitude,
        args.longitude
      );

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getPairs();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const acceptPairThunk = createAsyncThunk(
  'users/acceptPair',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentPair } = user;
      const response = await userService.acceptPair(currentPair!.id);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const refusePairThunk = createAsyncThunk(
  'users/refusePair',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState() as RootState;
      const { currentPair } = user;
      const response = await userService.deletePair(currentPair!.id);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const saveUserImageThunk = createAsyncThunk(
  'users/saveUserImage',
  async (picture: Blob, { rejectWithValue }) => {
    try {
      const response = await userService.savePicture(picture);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const deleteUserImage = createAsyncThunk(
  'users/deleteUserImage',
  async (order: number, { rejectWithValue }) => {
    try {
      const response = await userService.deletePicture(order);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const mixUserImages = createAsyncThunk(
  'users/mixUserImages',
  async (args: { order: number; withOrder: number }, { rejectWithValue }) => {
    try {
      const response = await userService.mixPictures(
        args.order,
        args.withOrder
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
