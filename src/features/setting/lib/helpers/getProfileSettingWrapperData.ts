import type { ProfileSettingName } from '@entities/setting/model';
import type { ProfileSettingWrapperData } from '../constants/profileSettingWrapperData';
import { PROFILE_SETTING_WRAPPER_DATA } from '../constants';

export function getProfileSettingWrapperData(
  settingName: ProfileSettingName | null
): ProfileSettingWrapperData {
  if(!settingName) {
    return PROFILE_SETTING_WRAPPER_DATA.default
  }
  return  PROFILE_SETTING_WRAPPER_DATA[settingName]
}
