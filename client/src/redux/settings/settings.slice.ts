import { IUser, PartnerSettings } from './../../models/IUser';
import { createSlice } from '@reduxjs/toolkit';
import { submitSettingsThunk } from './settings.thunks';

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

type RangeType = { from: number; to: number };

export type ChangedData = String | Number | Boolean | String[] | RangeType;

export type InnerObjectName = 'partnerSettings' | null;
export type SettingInputName = keyof IUser | keyof PartnerSettings | null;

interface InitialState {
  settingInputName: SettingInputName;
  innerObjectName: InnerObjectName;
  isUserInfoSetting: boolean;
  validaton: Validation | null;
  formName: string | null;
}

const initialState: InitialState = {
  settingInputName: null,
  innerObjectName: null,
  isUserInfoSetting: false,
  validaton: null,
  formName: null,
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setInputName: (state, { payload }) => {
      state.settingInputName = payload;
    },
    setInnerObjectName: (state, { payload }) => {
      state.innerObjectName = payload;
    },
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
    },
  },
  extraReducers(builder) {
    builder.addCase(submitSettingsThunk.pending, (state) => {
      state.isUserInfoSetting = false;
    });
  },
});

export const {
  setInputName,
  setInnerObjectName,
  setIsUserInfoSetting,
  setValidation,
  setInput,
} = settingSlice.actions;

export default settingSlice.reducer;
