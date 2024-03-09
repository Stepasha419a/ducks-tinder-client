import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PartialUser } from '@shared/api/services/user/user-service.interface';
import { userService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import type { Picture } from '@/shared/api/interfaces';

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
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

export const getPairsInfoThunk = createAsyncThunk(
  'users/getPairsInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getPairsInfo();

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
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userService.deletePicture(id);

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
      const newOrders = []
      for(let i = 0; i < pictures.length; i++) {
        newOrders.push(pictures.findIndex(item => item.order === i))
      }
      
      const response = await userService.mixPictures(newOrders);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);


// 0 1 2
// 1 2 0
// 2 0 1
