import { useLocation } from 'react-router-dom';
import { getSettingType, getSettingUrl } from '../helpers';
import { SettingNameEnum } from '../../model/setting/setting.interfaces';
import { SETTING_LIST } from '../../model/setting/setting.constants';

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
