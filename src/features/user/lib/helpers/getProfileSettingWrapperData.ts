import type { ProfileSettingWrapperData } from '../constants/profileSettingWrapperData';
import { PROFILE_SETTING_WRAPPER_DATA } from '../constants';
import type { ProfileSettingNameEnum } from '@/entities/user/lib';

export function getProfileSettingWrapperData(
  settingName: ProfileSettingNameEnum | null
): ProfileSettingWrapperData {
  if (!settingName) {
    return PROFILE_SETTING_WRAPPER_DATA.default;
  }
  return PROFILE_SETTING_WRAPPER_DATA[settingName];
}
