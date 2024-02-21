import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '@entities/user/model';
import { returnErrorMessage } from '@shared/helpers';
import type { PartialUser } from '@/shared/api/services/user/user-service.interface';

export const submitSettingsThunk = createAsyncThunk(
  'settings/submitSettings',
  (data: PartialUser, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateUserThunk(data));
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
