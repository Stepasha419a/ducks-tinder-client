import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Setting, UserInitialState } from './user.interface';
import {
  deleteUserPictureThunk,
  mixUserPicturesThunk,
  saveUserImageThunk,
  updateUserPlaceThunk,
  updateUserThunk,
} from './user.thunks';
import { useUserStore } from '@ducks-tinder-client/auth';

const initialState: UserInitialState = {
  errorFields: [],
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    checkFields: (state, { payload }: PayloadAction<Setting[]>) => {
      state.errorFields = payload;
    },
    resetUserSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        useUserStore.getState().setCurrentUser(payload);
      })
      .addCase(updateUserPlaceThunk.fulfilled, (state, { payload }) => {
        useUserStore.getState().setCurrentUser(payload);
      })
      .addCase(saveUserImageThunk.fulfilled, (state, { payload }) => {
        useUserStore.getState().setCurrentUser(payload);
      })
      .addCase(deleteUserPictureThunk.fulfilled, (state, { payload }) => {
        useUserStore.getState().setCurrentUser(payload);
      })
      .addCase(mixUserPicturesThunk.fulfilled, (state, { payload }) => {
        useUserStore.getState().setCurrentUser(payload);
      });
  },
});

export const { checkFields, resetUserSlice } = userSlice.actions;

export const userReducer = userSlice.reducer;
