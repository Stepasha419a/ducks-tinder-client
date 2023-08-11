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
  settingType: null,
  settingName: null,
  validation: null,
  formName: null,
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setInput: (
      state,
      {
        payload: { settingName, formName, validation },
      }: PayloadAction<SetInputPayload>
    ) => {
      state.formName = formName || settingName;
      state.settingName = settingName;
      state.validation = validation || null;

      switch (settingName) {
        case 'interests':
          state.settingType = 'select';
          break;
        case 'description':
          state.settingType = 'textarea';
          break;
        case 'sex':
        case 'preferSex':
          state.settingType = 'radio';
          break;
        case 'place':
          state.settingType = 'external';
          break;
        default:
          state.settingType = 'text';
      }
    },
    nullInput: (state) => {
      state.formName = null;
      state.settingName = null;
      state.settingType = null;
      state.validation = null;
    },
    checkFields: (state, { payload }: PayloadAction<User>) => {
      state.errorFields = checkUserFields(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSettingsThunk.fulfilled, (state) => {
      state.formName = null;
      state.settingName = null;
      state.settingType = null;
      state.validation = null;
    });
  },
});

export const { setInput, nullInput, checkFields } = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
