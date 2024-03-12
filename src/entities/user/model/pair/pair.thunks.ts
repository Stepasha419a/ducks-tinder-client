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
  async (_, { rejectWithValue, getState }) => {
    try {
      const { pair } = getState() as RootState;
      const { currentPair } = pair;
      const response = await userService.acceptPair(currentPair!.id);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const refusePairThunk = createAsyncThunk(
  'users/refusePair',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { pair } = getState() as RootState;
      const { currentPair } = pair;
      const response = await userService.deletePair(currentPair!.id);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
