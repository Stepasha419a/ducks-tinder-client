import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ShortUser } from '@shared/api';
import {
  dislikeUserThunk,
  getMatchUsersThunk,
  likeUserThunk,
  returnUserThunk,
} from './tinder.thunks';

interface InitialState {
  tinderUsers: ShortUser[];
pendingUserIds: string[];
  isReturnUser: boolean;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: InitialState = {
  tinderUsers: [],
  pendingUserIds: [],
  isReturnUser: false,
  isLoading: false,
  isFailed: false,
};

const tinderSlice = createSlice({
  name: 'tinderSlice',
  initialState,
  reducers: {
    resetTinderSlice: (state) => {
      Object.assign(state, initialState);
    },
    skipCurrentTinderUser: (state) => {
      const user = state.tinderUsers.shift();
      if (user) {
        state.pendingUserIds.push(user.id);
      }
    },
    deletePendingUserId: (state, { payload }: PayloadAction<string>) => {
      state.pendingUserIds = state.pendingUserIds.filter(
        (id) => id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchUsersThunk.pending, (state) => {
        state.isFailed = false;
        state.isLoading = true;
      })
      .addCase(
        getMatchUsersThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser[]>) => {
          if (payload.length === 0 && state.tinderUsers.length === 0) {
            state.isFailed = true;
          }

          state.tinderUsers = state.tinderUsers.concat(payload);
        }
      )
      .addCase(getMatchUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(returnUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isReturnUser = false;
      })
      .addCase(
        returnUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUsers.unshift(payload);
          }
          state.isLoading = false;
        }
      )
      .addCase(likeUserThunk.pending, (state) => {
        state.isReturnUser = false;
      })
      .addCase(likeUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(dislikeUserThunk.pending, (state) => {
        state.isReturnUser = true;
      })
      .addCase(dislikeUserThunk.rejected, (state) => {
        state.isFailed = true;
      });
  },
});

export const { resetTinderSlice, skipCurrentTinderUser, deletePendingUserId } =
  tinderSlice.actions;

export const tinderReducer = tinderSlice.reducer;
