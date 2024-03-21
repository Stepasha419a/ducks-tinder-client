import { toast } from 'react-toastify';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import {
  deleteUserPictureThunk,
  mixUserPicturesThunk,
  saveUserImageThunk,
  updateUserThunk,
  updateUserPlaceThunk,
} from './user.thunks';
import type { UserInitialState } from './user.interface';
import { checkUserFields } from './helpers';

const initialState: UserInitialState = {
  // auth always set currentUser object after registration/login/refresh
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
    checkFields: (state, { payload }: PayloadAction<User>) => {
      state.errorFields = checkUserFields(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.rejected, (_, { payload }) => {
        if (payload === 'User already exists') {
          toast('This email address is already used, try another one');
        }
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

export const { setCurrentUser, checkFields } = userSlice.actions;

export const userReducer = userSlice.reducer;
