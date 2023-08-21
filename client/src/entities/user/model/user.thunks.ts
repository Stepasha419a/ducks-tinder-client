import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChangedData, PartialUser, Picture } from '@shared/api/interfaces';
import type { Setting } from '@entities/setting/model';
import { userService } from '@shared/api/services';
import { makeDataObject } from '@shared/helpers';
import { returnErrorMessage } from '@shared/helpers';

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (
    args: {
      settingName: Setting;
      changedData: ChangedData;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = makeDataObject({ ...args });

      const response = await userService.updateUser(data);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const updateUserMultipleFieldsThunk = createAsyncThunk(
  'users/updateUserMultipleFields',
  async (data: PartialUser, { rejectWithValue }) => {
    try {
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

export const deleteUserPictureThunk = createAsyncThunk(
  'users/deleteUserPicture',
  async (order: number, { rejectWithValue }) => {
    try {
      const response = await userService.deletePicture(order);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const mixUserPicturesThunk = createAsyncThunk(
  'users/mixUserPictures',
  async (pictures: Picture[], { rejectWithValue }) => {
    try {
      const response = await userService.mixPictures(pictures);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
