import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@shared/api';

import type { Setting, UserInitialState } from './user.interface';
import {
  deleteUserPictureThunk,
  getCurrentUser,
  mixUserPicturesThunk,
  saveUserImageThunk,
  updateUserPlaceThunk,
  updateUserThunk,
} from './user.thunks';

const initialState: UserInitialState = {
  currentUser: null,
  errorFields: [],
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    checkFields: (state, { payload }: PayloadAction<Setting[]>) => {
      state.errorFields = payload;
    },
    resetUserSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(updateUserPlaceThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(saveUserImageThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(deleteUserPictureThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(mixUserPicturesThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      });
  },
});

export const { setCurrentUser, checkFields, resetUserSlice } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
