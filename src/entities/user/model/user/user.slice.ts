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

const initialState: UserInitialState = {
  // auth always set currentUser object after registration/login/refresh
  currentUser: {} as User,
  profileSetting: {
    imageURL: null,
    isDialogUploadOpen: false,
    isImageCropOpen: false,
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    setIsDialogUploadOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.profileSetting.isDialogUploadOpen = payload;
    },
    setIsImageCropOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.profileSetting.isImageCropOpen = payload;
    },
    setImageChange: (state, { payload }: PayloadAction<string | null>) => {
      state.profileSetting.isDialogUploadOpen = false;
      state.profileSetting.imageURL = payload;
      state.profileSetting.isImageCropOpen = true;
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
        state.profileSetting.isImageCropOpen = false;
        state.profileSetting.imageURL = null;
      })
      .addCase(deleteUserPictureThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(mixUserPicturesThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      });
  },
});

export const {
  setCurrentUser,
  setIsDialogUploadOpen,
  setIsImageCropOpen,
  setImageChange,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
