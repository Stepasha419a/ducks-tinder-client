import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import {
  deletePairThunk,
  deleteUserImage,
  dislikeUserThunk,
  getSortedUserThunk,
  getUserPairsThunk,
  likeUserThunk,
  mixUserImages,
  returnUserThunk,
  saveUserImage,
  updateUserThunk,
} from './users.thunks';

interface InitialState {
  currentUser: IUser;
  pairs: IUser[];
  tinderUsers: IUser[];
  isReturnUser: boolean;
  requestedUsers: string[];
  currentTinderUsersIndex: number;
  isFailed: boolean;
}

const initialState: InitialState = {
  // auth always set currentUser object after registration/login/refresh
  currentUser: {} as IUser,
  pairs: [],
  tinderUsers: [],
  isReturnUser: false,
  requestedUsers: [],
  currentTinderUsersIndex: 0,
  isFailed: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
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
      .addCase(getUserPairsThunk.fulfilled, (state, action) => {
        // always returns an array
        if (Array.isArray(action.payload)) {
          if (
            state.pairs[0] &&
            state.pairs[0]?._id !== action.payload[0]?._id
          ) {
            state.pairs = [state.pairs[0], ...action.payload];
          } else {
            state.pairs = [...action.payload];
          }
        }
      })
      .addCase(deletePairThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload?.data;

        state.pairs.filter((pair) => pair._id !== action.payload?.deletedId);
      })
      .addCase(getSortedUserThunk.fulfilled, (state, { payload }) => {
        state.tinderUsers = [...state.tinderUsers, { ...payload }] as IUser[];
      })
      .addCase(getSortedUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      })
      .addCase(likeUserThunk.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.currentTinderUsersIndex++;
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
      .addCase(returnUserThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.currentUser = payload;
          state.currentTinderUsersIndex--;
          state.isReturnUser = false;
        }
      })
      .addCase(dislikeUserThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.currentUser = payload;
          state.currentTinderUsersIndex++;
          state.isReturnUser = true;
        }
      });
  },
});

export const {
  setCurrentUser,
  setRequestedUsers,
  setIsReturnUser,
  setCurrentTinderUsersIndex,
} = usersSlice.actions;

export default usersSlice.reducer;
