import { SettingNameEnum, SettingTypeEnum } from '../constants';

export function getSettingType(settingName: SettingNameEnum): SettingTypeEnum {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (settingName) {
    case SettingNameEnum.DESCRIPTION:
      return SettingTypeEnum.TEXTAREA;
    case SettingNameEnum.SEX:
    case SettingNameEnum.PREFER_SEX:
      return SettingTypeEnum.RADIO;
    default:
      return SettingTypeEnum.TEXT;
  }
}
