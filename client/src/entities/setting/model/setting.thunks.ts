import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '@entities/user/model';
import type { ChangedData } from '@shared/api/interfaces';
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

export const submitProfileSettingsThunk = createAsyncThunk(
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
      const { profileSetting } = setting;
      const { settingName } = profileSetting;

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
