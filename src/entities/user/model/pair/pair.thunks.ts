import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '@shared/api/services';
import { returnErrorMessage } from '@shared/helpers';

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getPairs();

      return response.data;
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
