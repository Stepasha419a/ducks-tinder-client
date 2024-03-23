import { useLocation } from 'react-router-dom';
import { getSettingType, getSettingUrl } from '../helpers';
import { SETTING_LIST, SettingNameEnum } from '../constants';

const settingRegex = /\/settings\/([a-z]+(?:(?:-)(?:[a-z]+))*)/;

export function useSettingUrl() {
  const { pathname } = useLocation();

  const settingName = getSettingUrl(pathname, settingRegex);

  if (
    !settingName ||
    !Object.values(SettingNameEnum).includes(settingName as SettingNameEnum)
  ) {
    return null;
  }

  const settingProperties = SETTING_LIST[settingName as SettingNameEnum];

  const formName = settingProperties?.formName || settingName;

  const settingType = getSettingType(settingName as SettingNameEnum);

  return {
    settingName: settingName as SettingNameEnum,
    settingType,
    formName,
    validation: settingProperties?.validation,
  };
}
