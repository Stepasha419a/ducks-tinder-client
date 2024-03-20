import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import { checkUserFields } from './helpers';
import type { SettingInitialState } from './setting.interfaces';

const initialState: SettingInitialState = {
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    checkFields: (state, { payload }: PayloadAction<User>) => {
      state.errorFields = checkUserFields(payload);
    },
  },
});

export const { checkFields } = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
