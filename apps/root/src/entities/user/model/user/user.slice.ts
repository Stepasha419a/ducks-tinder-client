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
import type { User } from '@ducks-tinder-client/common';
import { globalEventEmitter } from '@ducks-tinder-client/common';

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
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        globalEventEmitter.emit('set-user', payload);
      })
      .addCase(updateUserPlaceThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        globalEventEmitter.emit('set-user', payload);
      })
      .addCase(saveUserImageThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        globalEventEmitter.emit('set-user', payload);
      })
      .addCase(deleteUserPictureThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        globalEventEmitter.emit('set-user', payload);
      })
      .addCase(mixUserPicturesThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        globalEventEmitter.emit('set-user', payload);
      });
  },
});

export const { setCurrentUser, checkFields, resetUserSlice } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
