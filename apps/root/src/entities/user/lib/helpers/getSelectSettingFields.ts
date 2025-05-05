import type {
  ProfileSettingNameEnum,
  ProfileSettingSelectNameEnum,
} from '../constants';
import { SELECT_SETTING_FIELDS } from '../constants';

export function getSelectSettingFields(
  settingName: ProfileSettingNameEnum
): ProfileSettingSelectNameEnum[] {
  return SELECT_SETTING_FIELDS[settingName];
}
