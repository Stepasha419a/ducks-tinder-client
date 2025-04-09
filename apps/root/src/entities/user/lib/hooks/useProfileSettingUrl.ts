import { useLocation } from 'react-router-dom';

import { getSettingUrl } from '@entities/user';

import { PROFILE_SETTING_REGEX , ProfileSettingNameEnum } from '../constants';


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
