import { createSlice } from '@reduxjs/toolkit';
import { InnerObjectName, SettingInputName } from '../../models/User/User';
import { ErrorField, Setting, Validation } from '../../shared/interfaces';
import { checkUserFields } from './helpers';
import { submitSettingsThunk } from './settings.thunks';

interface InitialState {
  setting: Setting;
  settingInputName: SettingInputName;
  innerObjectName: InnerObjectName;
  isUserInfoSetting: boolean;
  validaton: Validation | null;
  formName: string | null;
  errorFields: ErrorField[];
}

const initialState: InitialState = {
  setting: null,
  settingInputName: null,
  innerObjectName: null,
  isUserInfoSetting: false,
  validaton: null,
  formName: null,
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsUserInfoSetting: (state, { payload }) => {
      state.isUserInfoSetting = payload;
    },
    setValidation: (state, { payload }) => {
      state.validaton = payload;
    },
    setInput: (state, { payload }) => {
      if (!payload.formName) {
        state.formName = payload.inputName;
      } else {
        state.formName = payload.formName;
      }
      state.innerObjectName = payload.innerObjectName;
      state.settingInputName = payload.inputName;
      state.validaton = payload.validation;
      state.isUserInfoSetting = true;

      switch (payload.inputName) {
        case 'interests':
          state.setting = 'select';
          break;
        case 'description':
          state.setting = 'textarea';
          break;
        case 'sex':
        case 'preferSex':
          state.setting = 'radio';
          break;
        default:
          state.setting = null;
      }
    },
    checkFields: (state, { payload }) => {
      state.errorFields = checkUserFields(payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(submitSettingsThunk.pending, (state) => {
      state.isUserInfoSetting = false;
    });
  },
});

export const { setIsUserInfoSetting, setValidation, setInput, checkFields } =
  settingSlice.actions;

export default settingSlice.reducer;
