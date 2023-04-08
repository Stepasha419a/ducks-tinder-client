import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '../users/users.thunks';
import type { RootState } from '../store';
import type { AxiosErrorResponse, ChangedData, InnerObjectName, SettingInputName } from '../../shared/api/interfaces';

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
          inputName: args.inputName ?? settingInputName!,
          innerObjectName: args.innerObjectName ?? innerObjectName,
          changedData: args.changedData,
        })
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          (error as AxiosErrorResponse).response!.data.message
        );
      }
      return rejectWithValue((error as Error).message);
    }
  }
);
