import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ShortUser, User } from '@shared/api/interfaces';
import {
  acceptPairThunk,
  deletePairThunk,
  deleteUserImage,
  getUserPairsThunk,
  mixUserImages,
  saveUserImageThunk,
  updateUserThunk,
} from './user.thunks';
import type { PairSorts, UserInitialState } from './user.interfaces';
import { INITIAL_SORTS } from './user.constants';

const initialState: UserInitialState = {
  // auth always set currentUser object after registration/login/refresh
  currentUser: {} as User,
  currentPair: null,
  pairs: [],
  pairsCount: null,
  pairSorts: INITIAL_SORTS,
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
    setCurrentPair: (state, { payload }: PayloadAction<ShortUser | null>) => {
      state.currentPair = payload;
    },
    setPairSorts: (state, { payload }: PayloadAction<PairSorts>) => {
      state.pairSorts = payload;
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
      .addCase(getUserPairsThunk.fulfilled, (state, action) => {
        state.pairs = action.payload;
      })
      .addCase(acceptPairThunk.fulfilled, (state, { payload }) => {
        state.pairs = payload;
        state.currentPair = null;
      })
      .addCase(deletePairThunk.fulfilled, (state, { payload }) => {
        state.pairs = payload;
        state.currentPair = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(saveUserImageThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.profileSetting.isImageCropOpen = false;
        state.profileSetting.imageURL = null;
      })
      .addCase(deleteUserImage.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(mixUserImages.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
  },
});

export const {
  setCurrentUser,
  setCurrentPair,
  setPairSorts,
  setIsDialogUploadOpen,
  setIsImageCropOpen,
  setImageChange,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
