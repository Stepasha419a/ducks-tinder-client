import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import { checkUserFields } from './helpers';
import type {
  ProfileSettingName,
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
  profileSetting: {
    settingType: null,
    settingName: null,
  },
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
        case 'description':
          state.settingType = 'textarea';
          break;
        case 'sex':
        case 'preferSex':
          state.settingType = 'radio';
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
    setProfileSetting: (
      state,
      { payload }: PayloadAction<ProfileSettingName>
    ) => {
      state.profileSetting.settingName = payload;
      state.profileSetting.settingType = 'select';
    },
    nullProfileSetting: (state) => {
      state.profileSetting.settingName = null;
      state.profileSetting.settingType = null;
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

export const {
  setInput,
  nullInput,
  checkFields,
  setProfileSetting,
  nullProfileSetting,
} = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
