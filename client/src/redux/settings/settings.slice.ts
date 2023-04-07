import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../shared/api/interfaces';
import type { Validation } from '../../shared/interfaces';
import { checkUserFields } from './helpers';
import type {
  SetInputPayload,
  SettingsInitialState,
} from './settings.interfaces';
import { submitSettingsThunk } from './settings.thunks';

const initialState: SettingsInitialState = {
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
    setIsUserInfoSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserInfoSetting = payload;
    },
    setValidation: (state, { payload }: PayloadAction<Validation | null>) => {
      state.validaton = payload;
    },
    setInput: (state, { payload }: PayloadAction<SetInputPayload>) => {
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

export const { setIsUserInfoSetting, setValidation, setInput, checkFields } =
  settingSlice.actions;

export default settingSlice.reducer;
