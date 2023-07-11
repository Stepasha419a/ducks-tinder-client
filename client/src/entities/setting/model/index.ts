export {
  settingReducer,
  checkFields,
  setInput,
  nullInput,
  setIsUserInfoSetting,
} from './setting.slice';
export { submitSettingsThunk } from './setting.thunks';
export type {
  Setting,
  SetInputPayload,
  SettingFieldInterestsArray,
  SettingFieldValues,
  Validation,
} from './setting.interfaces';
