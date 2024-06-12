import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  GetUserPairsThunkReturn,
  PairInitialState,
} from './pair.interface';
import {
  acceptPairThunk,
  getPairsInfoThunk,
  getUserPairsThunk,
  refusePairThunk,
} from './pair.thunks';
import { PAGINATION_TAKE } from '@shared/lib/constants';
import type { PairsInfo } from '@shared/api/services/user/user-service.interface';

const initialState: PairInitialState = {
  pairs: [],
  isPairsLoading: false,
  isPairsEnded: false,
  isPairsInfoLoading: true,
  pairsInfo: null,
};

const pairSlice = createSlice({
  name: 'pairSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserPairsThunk.pending,
        (
          state,
          {
            meta: {
              arg: { isInitial },
            },
          }
        ) => {
          if (isInitial) {
            state.pairs = [];
            state.isPairsEnded = false;
          }
          state.isPairsLoading = true;
        }
      )
      .addCase(
        getUserPairsThunk.fulfilled,
        (state, { payload }: PayloadAction<GetUserPairsThunkReturn>) => {
          const { pairs, isInitial } = payload;
          if (pairs.length < PAGINATION_TAKE) {
            state.isPairsEnded = true;
          }

          if (isInitial) {
            state.pairs = pairs;
          } else {
            state.pairs = state.pairs.concat(pairs);
          }

          state.isPairsLoading = false;
        }
      )
      .addCase(
        acceptPairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          if (state.pairsInfo !== null) {
            state.pairsInfo.count--;
          }

          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(
        refusePairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          if (state.pairsInfo !== null) {
            state.pairsInfo.count--;
          }

          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(getPairsInfoThunk.pending, (state) => {
        state.isPairsInfoLoading = true;
      })
      .addCase(
        getPairsInfoThunk.fulfilled,
        (state, { payload }: PayloadAction<PairsInfo>) => {
          state.pairsInfo = payload;
          state.isPairsInfoLoading = false;
        }
      );
  },
});

export const pairReducer = pairSlice.reducer;
