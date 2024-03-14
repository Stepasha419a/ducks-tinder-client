import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PairInitialState, PairSorts } from './pair.interface';
import { INITIAL_SORTS } from './pair.constants';
import {
  acceptPairThunk,
  getPairsInfoThunk,
  getUserPairsThunk,
  refusePairThunk,
} from './pair.thunks';

const initialState: PairInitialState = {
  isPairsLoading: true,
  pairs: [],
  pairSorts: INITIAL_SORTS,
  isPairsInfoLoading: true,
  pairsInfo: {
    count: 0,
    picture: null,
  },
};

const pairSlice = createSlice({
  name: 'pairSlice',
  initialState,
  reducers: {
    setPairSorts: (state, { payload }: PayloadAction<PairSorts>) => {
      state.pairSorts = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPairsThunk.fulfilled, (state, { payload }) => {
        state.pairs = payload;
        state.isPairsLoading = false;
      })
      .addCase(
        acceptPairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          state.pairsInfo.count--;
          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(
        refusePairThunk.fulfilled,
        (state, { payload: pairId }: PayloadAction<string>) => {
          state.pairsInfo.count--;
          state.pairs = state.pairs.filter((pair) => pair.id !== pairId);
        }
      )
      .addCase(getPairsInfoThunk.pending, (state) => {
        state.isPairsInfoLoading = true;
      })
      .addCase(getPairsInfoThunk.fulfilled, (state, { payload }) => {
        state.pairsInfo = payload;
        state.isPairsInfoLoading = false;
      });
  },
});

export const { setPairSorts } = pairSlice.actions;

export const pairReducer = pairSlice.reducer;
