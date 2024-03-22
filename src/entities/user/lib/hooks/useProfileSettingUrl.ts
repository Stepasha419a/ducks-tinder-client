import { getSettingUrl } from '@entities/user/lib';
import { useLocation } from 'react-router-dom';
import { PROFILE_SETTING_REGEX } from '../constants';
import { ProfileSettingNameEnum } from '../constants/profileSettingName';

export function useProfileSettingUrl() {
  const { pathname } = useLocation();

  const settingName = getSettingUrl(pathname, PROFILE_SETTING_REGEX);

  if (
    !settingName ||
    !Object.values(ProfileSettingNameEnum).includes(
      settingName as ProfileSettingNameEnum
    )
  ) {
    return null;
  }

  return {
    settingName: settingName as ProfileSettingNameEnum,
    settingType: 'select',
  };
}
