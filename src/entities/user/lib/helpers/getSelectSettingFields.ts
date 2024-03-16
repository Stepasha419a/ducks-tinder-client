import type { ProfileSettingSelectName } from '../../model/setting';
import type { ProfileSettingNameEnum } from '../constants';
import { SELECT_SETTING_FIELDS } from '../constants';

export function getSelectSettingFields(
  settingName: ProfileSettingNameEnum
): ProfileSettingSelectName[] {
  return SELECT_SETTING_FIELDS[settingName];
}
