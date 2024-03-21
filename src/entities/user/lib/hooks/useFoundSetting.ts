import { useLocation } from 'react-router-dom';
import { getSettingUrl } from '../helpers';
import { SETTING_REGEX } from '../constants';
import { SettingNameEnum } from '../../model/user';

export function useFoundSetting() {
  const { pathname } = useLocation();

  const settingName = getSettingUrl(pathname, SETTING_REGEX);

  if (!settingName) {
    return undefined;
  }

  if (
    !Object.values(SettingNameEnum).includes(settingName as SettingNameEnum)
  ) {
    return null;
  }

  return settingName as SettingNameEnum;
}
