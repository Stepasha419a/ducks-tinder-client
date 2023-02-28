import { createSlice } from '@reduxjs/toolkit';
import { submitSettingsThunk } from './settings.thunks';
import { checkUserFields } from './utils';
import {
  ErrorField,
  InnerObjectName,
  KindOfSetting,
  SettingInputName,
  Validation,
} from './settings.interfaces';

interface InitialState {
  kindOfSetting: KindOfSetting;
  settingInputName: SettingInputName;
  innerObjectName: InnerObjectName;
  isUserInfoSetting: boolean;
  validaton: Validation | null;
  formName: string | null;
  errorFields: ErrorField[];
}

const initialState: InitialState = {
  kindOfSetting: null,
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
          state.kindOfSetting = 'select';
          break;
        case 'description':
          state.kindOfSetting = 'textarea';
          break;
        case 'sex':
        case 'preferSex':
          state.kindOfSetting = 'radio';
          break;
        default:
          state.kindOfSetting = null;
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
