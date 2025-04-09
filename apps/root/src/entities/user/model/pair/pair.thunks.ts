import { createAsyncThunk } from '@reduxjs/toolkit';

import type { PairFilterParams } from '@ducks-tinder-client/common';
import { PAGINATION_TAKE , returnErrorMessage , userService } from '@ducks-tinder-client/common';

import type { GetUserPairsProps } from './pair.interface';
import { deletePairById } from './pair.slice';

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (
    { isInitial, filter }: GetUserPairsProps,
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        pair: {
          pairs: { length },
        },
      } = getState() as RootState;

      const params: PairFilterParams = {
        skip: isInitial ? 0 : length,
        take: PAGINATION_TAKE,

        ageFrom: filter?.age.from,
        ageTo: filter?.age.to,
        distance: filter?.distance,
        interests: filter?.interests,
        pictures: filter?.pictures,
      };
      if (filter?.hasInterests) {
        params.hasInterests = filter.hasInterests;
      }
      if (filter?.identifyConfirmed) {
        params.identifyConfirmed = filter.identifyConfirmed;
      }

      const response = await userService.getPairs(params, true);

      return { pairs: response.data, isInitial };
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const getPairsInfoThunk = createAsyncThunk(
  'users/getPairsInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getPairsInfo();

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const acceptPairThunk = createAsyncThunk(
  'users/acceptPair',
  async (pairId: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(deletePairById(pairId));

      const response = await userService.acceptPair(pairId);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const refusePairThunk = createAsyncThunk(
  'users/refusePair',
  async (pairId: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(deletePairById(pairId));

      const response = await userService.deletePair(pairId);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
