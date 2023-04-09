import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import {
  dislikeUserThunk,
  getSortedUserThunk,
  likeUserThunk,
  returnUserThunk,
} from './tinder.thunks';

interface InitialState {
  tinderUsers: User[];
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
  name: 'tinder',
  initialState,
  reducers: {
    setIsReturnUser: (state, { payload }: PayloadAction<boolean>) => {
      state.isReturnUser = payload;
    },
    setRequestedUsers: (state, { payload }: PayloadAction<string[]>) => {
      state.requestedUsers = [...payload];
    },
    setCurrentTinderUsersIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentTinderUsersIndex = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSortedUserThunk.fulfilled, (state, { payload }) => {
        state.tinderUsers = [...state.tinderUsers, { ...payload }] as User[];
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

export const {
  setRequestedUsers,
  setIsReturnUser,
  setCurrentTinderUsersIndex,
} = tinderSlice.actions;

export default tinderSlice.reducer;
