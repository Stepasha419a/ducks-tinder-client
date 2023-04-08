import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '../users/users.thunks';
import type { RootState } from '../store';
import type { ChangedData, InnerObjectName, SettingInputName } from '../../shared/api/interfaces';
import { returnErrorMessage } from '../../shared/helpers';

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
      return rejectWithValue(returnErrorMessage(error));
    }
  }
);
