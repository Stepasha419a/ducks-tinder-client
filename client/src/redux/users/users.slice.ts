import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../shared/api/interfaces';
import {
  dislikeUserThunk,
  likeUserThunk,
  returnUserThunk,
} from '../tinder/tinder.thunks';
import {
  deletePairThunk,
  deleteUserImage,
  getUserPairsThunk,
  mixUserImages,
  saveUserImage,
  updateUserThunk,
} from './users.thunks';

interface InitialState {
  currentUser: User;
  pairs: User[];
}

const initialState: InitialState = {
  // auth always set currentUser object after registration/login/refresh
  currentUser: {} as User,
  pairs: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPairsThunk.fulfilled, (state, action) => {
        state.pairs = [...action.payload];
      })
      .addCase(deletePairThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload?.data;

        state.pairs.filter((pair) => pair._id !== action.payload?.deletedId);
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(saveUserImage.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(deleteUserImage.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(mixUserImages.fulfilled, (state, { payload }) => {
        if (payload) {
          state.currentUser = payload;
        }
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

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
