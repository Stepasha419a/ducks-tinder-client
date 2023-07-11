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
  isUserInfoSetting: false,
  validation: null,
  formName: null,
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setIsUserInfoSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserInfoSetting = payload;
    },
    setInput: (
      state,
      {
        payload: { settingName, formName, validation },
      }: PayloadAction<SetInputPayload>
    ) => {
      state.formName = formName || settingName;
      state.settingName = settingName;
      state.validation = validation || null;
      state.isUserInfoSetting = true;

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
          state.settingType = 'hidden';
          break;
        default:
          state.settingType = null;
      }
    },
    nullInput: (state) => {
      state.formName = null;
      state.settingName = null;
      state.isUserInfoSetting = false;
      state.settingType = null;
      state.validation = null;
    },
    checkFields: (state, { payload }: PayloadAction<User>) => {
      state.errorFields = checkUserFields(payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(submitSettingsThunk.pending, (state) => {
      state.isUserInfoSetting = false;
    });
  },
});

export const { setIsUserInfoSetting, setInput, nullInput, checkFields } =
  settingSlice.actions;

export const settingReducer = settingSlice.reducer;
