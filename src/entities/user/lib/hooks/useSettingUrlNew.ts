import { useLocation } from 'react-router-dom';
import { getSettingUrl } from '../helpers';
import type { SettingTypeEnum } from '../../model/setting/setting.interfaces';
import { SettingNameEnum } from '../../model/setting/setting.interfaces';
import { SETTING_LIST } from '../../model/setting/setting.constants';

const settingRegex = /\/settings\/([a-z]+(?:(?:-)(?:[a-z]+))*)/;

export function useSettingUrlNew() {
  const { pathname } = useLocation();

  const settingName = getSettingUrl(pathname, settingRegex);

  if (!settingName) {
    return undefined;
  }

  if (
    !Object.values(SettingNameEnum).includes(settingName as SettingNameEnum)
  ) {
    return null;
  }

  const settingProperties = SETTING_LIST[settingName as SettingNameEnum];

  const settingType = getSettingType(settingName as SettingNameEnum);

  return {
    settingName: settingName as SettingNameEnum,
    settingType: settingType as SettingTypeEnum,
    formName: settingProperties?.formName || settingName,
    validation: settingProperties?.validation,
  };
}

function getSettingType(settingName: SettingNameEnum) {
  switch (settingName) {
    case 'description':
      return 'textarea';
    case 'sex':
    case 'preferSex':
      return 'radio';
    default:
      return 'text';
  }
}
