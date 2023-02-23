import { updateUserThunk } from './../users/users.thunks';
import { RootState } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ChangedData } from './settings.slice';

export const submitSettingsThunk = createAsyncThunk(
  'settings/submitSettings',
  async (
    args: {
      changedData: ChangedData;
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { settings } = getState() as RootState;
      const { settingInputName, innerObjectName } = settings;

      dispatch(
        updateUserThunk({
          inputName: settingInputName!,
          innerObjectName,
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
