import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '@entities/user/model';
import type { PartialUser } from '@shared/api/interfaces';
import { returnErrorMessage } from '@shared/helpers';

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
