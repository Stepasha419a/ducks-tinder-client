import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Picture, User } from '@shared/api';
import { serviceGetter } from '@shared/api';
import { returnErrorMessage } from '@shared/lib';

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceGetter.getUserService().getMe();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await serviceGetter.getUserService().updateUser(data);

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
      const response = await serviceGetter
        .getUserService()
        .updateUserPlace(args.latitude, args.longitude);

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
      const response = await serviceGetter
        .getUserService()
        .savePicture(picture);

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
      const response = await serviceGetter.getUserService().deletePicture(id);

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
      const newOrders = [];
      for (let i = 0; i < pictures.length; i++) {
        newOrders.push(pictures.findIndex((item) => item.order === i));
      }

      const response = await serviceGetter
        .getUserService()
        .mixPictures(newOrders);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
