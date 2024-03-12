import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PairInitialState, PairSorts } from './pair.interface';
import { INITIAL_SORTS } from './pair.constants';
import type {
  ShortUser,
  ShortUserWithoutDistance,
} from '@/shared/api/interfaces';
import {
  acceptPairThunk,
  getPairsInfoThunk,
  getUserPairsThunk,
  refusePairThunk,
} from './pair.thunks';

const initialState: PairInitialState = {
  currentPair: null,
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
    setCurrentPair: (state, { payload }: PayloadAction<ShortUser | null>) => {
      state.currentPair = payload;
    },
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
        (state, { payload }: PayloadAction<ShortUserWithoutDistance>) => {
          state.pairs = state.pairs.filter((pair) => pair.id !== payload.id);
          state.currentPair = null;
        }
      )
      .addCase(
        refusePairThunk.fulfilled,
        (state, { payload }: PayloadAction<ShortUserWithoutDistance>) => {
          state.pairs = state.pairs.filter((pair) => pair.id !== payload.id);
          state.currentPair = null;
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

export const { setCurrentPair, setPairSorts } = pairSlice.actions;

export const pairReducer = pairSlice.reducer;
