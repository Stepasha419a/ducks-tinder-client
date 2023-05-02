import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserThunk } from '@entities/user/model';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import { returnErrorMessage } from '@shared/helpers';

export const submitSettingsThunk = createAsyncThunk(
  'settings/submitSettings',
  (
    args: {
      changedData: ChangedData;
      inputName?: SettingInputName;
      innerObjectName?: InnerObjectName;
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { setting } = getState() as RootState;
      const { settingInputName, innerObjectName } = setting;

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
