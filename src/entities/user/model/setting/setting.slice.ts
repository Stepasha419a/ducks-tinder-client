import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import { checkUserFields } from './helpers';
import type {
  SetInputPayload,
  SettingInitialState,
} from './setting.interfaces';
import { submitSettingsThunk } from './setting.thunks';

const initialState: SettingInitialState = {
  settingName: null,
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setInput: (
      state,
      { payload: { settingName } }: PayloadAction<SetInputPayload>
    ) => {
      state.settingName = settingName;
    },
    nullInput: (state) => {
      state.settingName = null;
    },
    checkFields: (state, { payload }: PayloadAction<User>) => {
      state.errorFields = checkUserFields(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSettingsThunk.fulfilled, (state) => {
      state.settingName = null;
    });
  },
});

export const { setInput, nullInput, checkFields } = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
