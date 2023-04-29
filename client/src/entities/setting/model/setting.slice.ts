import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@shared/api/interfaces';
import { checkUserFields } from './helpers';
import type {
  SetInputPayload,
  SettingsInitialState,
} from './setting.interfaces';
import { submitSettingsThunk } from './setting.thunks';

const initialState: SettingsInitialState = {
  setting: null,
  settingInputName: null,
  innerObjectName: null,
  isUserInfoSetting: false,
  validation: null,
  formName: null,
  errorFields: [],
};

const settingSlice = createSlice({
  name: 'settingReducer',
  initialState,
  reducers: {
    setIsUserInfoSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserInfoSetting = payload;
    },
    setInput: (
      state,
      {
        payload: {
          inputName,
          innerObjectName,
          formName,
          validation,
        },
      }: PayloadAction<SetInputPayload>
    ) => {
      state.formName = formName || inputName;
      state.innerObjectName = innerObjectName || null;
      state.settingInputName = inputName;
      state.validation = validation || null;
      state.isUserInfoSetting = true;

      switch (inputName) {
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

export const { setIsUserInfoSetting, setInput, checkFields } =
  settingSlice.actions;

export const settingReducer = settingSlice.reducer;
