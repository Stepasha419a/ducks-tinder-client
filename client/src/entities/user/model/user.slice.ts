import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '@entities/tinder/model';
import {
  deletePairThunk,
  deleteUserImage,
  getUserFirstPairThunk,
  getUserPairsThunk,
  mixUserImages,
  saveUserImageThunk,
  updateUserThunk,
} from './user.thunks';

interface InitialState {
  currentUser: User;
  currentPair: User | null;
  pairs: User[];
}

const initialState: InitialState = {
  // auth always set currentUser object after registration/login/refresh
  currentUser: {} as User,
  currentPair: null,
  pairs: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    setCurrentPair: (state, { payload }: PayloadAction<User | null>) => {
      state.currentPair = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFirstPairThunk.fulfilled, (state, action) => {
        state.pairs = [action.payload];
      })
      .addCase(getUserPairsThunk.fulfilled, (state, action) => {
        state.pairs = [...action.payload];
      })
      .addCase(deletePairThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;

        state.pairs.filter((pair) => pair._id !== action.payload.deletedId);
        state.currentPair = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(saveUserImageThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(deleteUserImage.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(mixUserImages.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(likeUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(returnUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload!;
      })
      .addCase(dislikeUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      });
  },
});

export const { setCurrentUser, setCurrentPair } = userSlice.actions;

export const userReducer = userSlice.reducer;