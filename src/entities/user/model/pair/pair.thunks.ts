import type { PairFilterParams } from '@shared/api/services/user/user-service.interface';
import { PAGINATION_TAKE } from '@shared/lib/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';
import type { GetUserPairsProps } from './pair.interface';

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

      const response = await userService.getPairs(params);

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
  async (pairId: string, { rejectWithValue }) => {
    try {
      const response = await userService.acceptPair(pairId);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const refusePairThunk = createAsyncThunk(
  'users/refusePair',
  async (pairId: string, { rejectWithValue }) => {
    try {
      const response = await userService.deletePair(pairId);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
