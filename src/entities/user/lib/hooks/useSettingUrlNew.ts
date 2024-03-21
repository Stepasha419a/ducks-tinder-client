import { useLocation } from 'react-router-dom';
import { getSettingType, getSettingUrl } from '../helpers';
import { SettingNameEnum } from '../../model/user/user.interface';
import { SETTING_LIST } from '../../model/user/user.constants';

const settingRegex = /\/settings\/([a-z]+(?:(?:-)(?:[a-z]+))*)/;

export function useSettingUrlNew() {
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
