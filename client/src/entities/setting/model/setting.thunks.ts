import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  updateUserRelationsThunk,
  updateUserThunk,
} from '@entities/user/model';
import type { PartialUser, PartialUserRelations } from '@shared/api/interfaces';
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

export const submitRelationSettingsThunk = createAsyncThunk(
  'settings/submitRelationSettings',
  (data: PartialUserRelations, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateUserRelationsThunk(data));
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
