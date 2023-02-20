import { IUser, PartnerSettings } from './../../models/IUser';
import { createSlice } from '@reduxjs/toolkit';

export type IUserInnerKey = 'partnerSettings' | null

export interface Validation {
  min?: number;
  max?: number;
  email?: boolean;
}

interface InitialState {
  settingInputName: keyof IUser | keyof PartnerSettings | null;
  innerObjectName: IUserInnerKey;
  isUserInfoSetting: boolean;
  validaton: Validation | null;
}

const initialState: InitialState = {
  settingInputName: null,
  innerObjectName: null,
  isUserInfoSetting: false,
  validaton: null,
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
  },
});

export const {
  setInputName,
  setInnerObjectName,
  setIsUserInfoSetting,
  setValidation,
} = settingSlice.actions;

export default settingSlice.reducer;
