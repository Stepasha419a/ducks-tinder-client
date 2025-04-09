import type { ProfileSettingNameEnum } from '@entities/user';

import type { ProfileSettingWrapperData } from '../constants';
import { PROFILE_SETTING_WRAPPER_DATA } from '../constants';

export function getProfileSettingWrapperData(
  settingName: ProfileSettingNameEnum | null
): ProfileSettingWrapperData {
  if (!settingName) {
    return PROFILE_SETTING_WRAPPER_DATA.default;
  }
  return PROFILE_SETTING_WRAPPER_DATA[settingName];
}
