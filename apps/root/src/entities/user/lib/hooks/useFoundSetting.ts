import { useLocation } from 'react-router-dom';
import { SETTING_REGEX, SettingNameEnum } from '../constants';
import { getSettingUrl } from '../helpers';

export function useFoundSetting() {
  const { pathname } = useLocation();

  const settingName = getSettingUrl(pathname, SETTING_REGEX);

  if (!settingName) {
    return undefined;
  }

  if (settingName === 'place') {
    return undefined;
  }

  if (
    !Object.values(SettingNameEnum).includes(settingName as SettingNameEnum)
  ) {
    return null;
  }

  return settingName as SettingNameEnum;
}
