import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User/User';
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
    setIsReturnUser: (state, action) => {
      state.isReturnUser = action.payload;
    },
    setRequestedUsers: (state, action) => {
      state.requestedUsers = [...action.payload];
    },
    setCurrentTinderUsersIndex: (state, action) => {
      state.currentTinderUsersIndex = action.payload;
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
        //state.currentUser = payload;
        state.currentTinderUsersIndex++;
      })
      .addCase(returnUserThunk.fulfilled, (state) => {
        //state.currentUser = payload;
        state.currentTinderUsersIndex--;
        state.isReturnUser = false;
      })
      .addCase(dislikeUserThunk.fulfilled, (state) => {
        //state.currentUser = payload;
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
