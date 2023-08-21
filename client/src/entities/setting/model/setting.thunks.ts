import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  updateUserMultipleFieldsThunk,
  updateUserThunk,
} from '@entities/user/model';
import type { ChangedData, PartialUser } from '@shared/api/interfaces';
import { returnErrorMessage } from '@shared/helpers';
import type { Setting } from './setting.interfaces';

export const submitSettingsThunk = createAsyncThunk(
  'settings/submitSettings',
  (
    args: {
      changedData: ChangedData;
      setting?: Setting;
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { setting } = getState() as RootState;
      const { settingName } = setting;

      dispatch(
        updateUserThunk({
          settingName: args.setting ?? settingName!,
          changedData: args.changedData,
        })
      );
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);

export const submitProfileSelectSettingsThunk = createAsyncThunk(
  'settings/submitProfileSelectSettings',
  (data: PartialUser, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateUserMultipleFieldsThunk(data));
    } catch (error: unknown) {
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
