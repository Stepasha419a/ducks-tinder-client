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
  isReturnLoading: boolean;
  isFailed: boolean;
}

const initialState: InitialState = {
  tinderUsers: [],
  pendingUserIds: [],
  isReturnUser: false,
  isLoading: false,
  isReturnLoading: false,
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

          const allUserIds = state.tinderUsers
            .map((user) => user.id)
            .concat(state.pendingUserIds);
          const withNoJustReturned = payload.filter(
            (user) => !allUserIds.includes(user.id)
          );

          state.isLoading = false;
          state.tinderUsers = state.tinderUsers.concat(withNoJustReturned);
        }
      )
      .addCase(getMatchUsersThunk.rejected, (state, { payload }) => {
        if (payload === 'canceled') {
          return;
        }

        state.isFailed = true;
      })
      .addCase(returnUserThunk.pending, (state) => {
        state.isReturnUser = false;
        state.isReturnLoading = true;
      })
      .addCase(
        returnUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUsers.unshift(payload);
          }
          state.isReturnLoading = false;
        }
      )
      .addCase(returnUserThunk.rejected, (state) => {
        state.isReturnLoading = false;
      })
      .addCase(likeUserThunk.pending, (state) => {
        state.isReturnUser = false;
      })
      .addCase(dislikeUserThunk.pending, (state) => {
        state.isReturnUser = true;
      });
  },
});

export const { resetTinderSlice, skipCurrentTinderUser, deletePendingUserId } =
  tinderSlice.actions;

export const tinderReducer = tinderSlice.reducer;
