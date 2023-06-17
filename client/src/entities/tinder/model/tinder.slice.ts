import { createSlice } from '@reduxjs/toolkit';
import type { ShortUser } from '@shared/api/interfaces';
import {
  dislikeUserThunk,
  getSortedUserThunk,
  likeUserThunk,
  returnUserThunk,
} from './tinder.thunks';

interface InitialState {
  tinderUsers: ShortUser[];
  isReturnUser: boolean;
  requestedUsers: string[];
  currentTinderUsersIndex: number;
  isFailed: boolean;
}

const initialState: InitialState = {
  tinderUsers: [],
  isReturnUser: false,
  requestedUsers: [],
  currentTinderUsersIndex: 0,
  isFailed: false,
};

const tinderSlice = createSlice({
  name: 'tinderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSortedUserThunk.fulfilled, (state, { payload }) => {
        state.tinderUsers = [...state.tinderUsers, payload];
      })
      .addCase(getSortedUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(likeUserThunk.fulfilled, (state) => {
        state.currentTinderUsersIndex++;
      })
      .addCase(returnUserThunk.fulfilled, (state) => {
        state.currentTinderUsersIndex--;
        state.isReturnUser = false;
      })
      .addCase(dislikeUserThunk.fulfilled, (state) => {
        state.currentTinderUsersIndex++;
        state.isReturnUser = true;
      });
  },
});

export const tinderReducer = tinderSlice.reducer;
