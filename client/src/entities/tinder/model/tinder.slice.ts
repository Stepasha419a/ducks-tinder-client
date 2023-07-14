import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ShortUser } from '@shared/api/interfaces';
import {
  dislikeUserThunk,
  getSortedUserThunk,
  likeUserThunk,
  returnUserThunk,
} from './tinder.thunks';

interface InitialState {
  tinderUser: ShortUser | null;
  isReturnUser: boolean;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: InitialState = {
  tinderUser: null,
  isReturnUser: false,
  isLoading: true,
  isFailed: false,
};

const tinderSlice = createSlice({
  name: 'tinderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSortedUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSortedUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser>) => {
          state.tinderUser = payload;
          state.isLoading = false;
        }
      )
      .addCase(getSortedUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(returnUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        returnUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUser = payload;
          }
          state.isReturnUser = false;
          state.isLoading = false;
        }
      )
      .addCase(likeUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        likeUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUser = payload;
          }
          state.isReturnUser = false;
          state.isLoading = false;
        }
      )
      .addCase(likeUserThunk.rejected, (state) => {
        state.isFailed = true;
      })
      .addCase(dislikeUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        dislikeUserThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUser | undefined>) => {
          if (payload) {
            state.tinderUser = payload;
          }
          state.isReturnUser = true;
          state.isLoading = false;
        }
      )
      .addCase(dislikeUserThunk.rejected, (state) => {
        state.isFailed = true;
      });
  },
});

export const tinderReducer = tinderSlice.reducer;
