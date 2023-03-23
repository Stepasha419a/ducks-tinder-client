import { updateUserThunk } from './../users/users.thunks';
import { RootState } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ChangedData, InnerObjectName, SettingInputName } from '../../models/User/User';

export const submitSettingsThunk = createAsyncThunk(
  'settings/submitSettings',
  async (
    args: {
      changedData: ChangedData;
      inputName?: SettingInputName;
      innerObjectName?: InnerObjectName;
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { settings } = getState() as RootState;
      const { settingInputName, innerObjectName } = settings;

      dispatch(
        updateUserThunk({
          inputName: args.inputName || settingInputName!,
          innerObjectName: args.innerObjectName || innerObjectName,
          changedData: args.changedData,
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);
