import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  GetUserPairsThunkReturn,
  PairFilterForm,
  PairInitialState,
} from './pair.interface';
import {
  acceptPairThunk,
  getPairsInfoThunk,
  getUserPairsThunk,
  refusePairThunk,
} from './pair.thunks';
import { PAGINATION_TAKE } from '@/shared/lib/constants';

const initialState: PairInitialState = {
  pairs: [],
  isPairsLoading: false,
  isPairsEnded: false,
  isPairsInfoLoading: true,
  pairsInfo: {
    count: 0,
    picture: null,
  },
  filter: {
    distance: 100,
    age: { from: 18, to: 100 },
    pictures: 0,
    interests: [],
    hasInterests: false,
    identifyConfirmed: false,
  },
};

const pairSlice = createSlice({
  name: 'pairSlice',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<PairFilterForm>) => {
      state.filter = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPairsThunk.pending, (state) => {
        state.isPairsLoading = true;
      })
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

export const { setFilter } = pairSlice.actions;

export const pairReducer = pairSlice.reducer;
