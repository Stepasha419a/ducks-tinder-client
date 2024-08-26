import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ShortUser } from '@shared/api';
import {
  dislikeUserThunk,
  getMatchUserThunk,
  likeUserThunk,
  returnUserThunk,
} from './tinder.thunks';

interface InitialState {
  tinderUsers: ShortUser[];
  isReturnUser: boolean;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: InitialState = {
  tinderUsers: [],
  isReturnUser: false,
  isLoading: true,
  isFailed: false,
};

const tinderSlice = createSlice({
  name: 'tinderSlice',
  initialState,
  reducers: {
    resetTinderSlice: (state) => {
      Object.assign(state, initialState);
    },
    deleteCurrentTinderUser: (state) => {
      state.tinderUsers.shift();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(
        getMatchUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser[]>) => {
          if (payload.length === 0 && state.tinderUsers.length === 0) {
            state.isFailed = true;
          }

          state.tinderUsers = state.tinderUsers.concat(payload);
          state.isLoading = false;
        }
      )
      .addCase(getMatchUserThunk.rejected, (state) => {
        state.isFailed = true;
        state.isLoading = false;
      })
      .addCase(returnUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        returnUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUsers.unshift(payload);
          }
          state.isReturnUser = false;
          state.isLoading = false;
        }
      )
      .addCase(likeUserThunk.fulfilled, (state) => {
        state.isReturnUser = false;
      })
      .addCase(likeUserThunk.rejected, (state) => {
        state.isFailed = true;
        state.isLoading = false;
      })
      .addCase(dislikeUserThunk.fulfilled, (state) => {
        state.isReturnUser = true;
      })
      .addCase(dislikeUserThunk.rejected, (state) => {
        state.isFailed = true;
        state.isLoading = false;
      });
  },
});

export const { resetTinderSlice, deleteCurrentTinderUser } =
  tinderSlice.actions;

export const tinderReducer = tinderSlice.reducer;
