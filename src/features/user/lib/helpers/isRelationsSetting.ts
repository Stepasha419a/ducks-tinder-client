import type { ProfileSettingNameEnum } from '@entities/user/lib/constants';
import { RELATION_SETTING_NAMES } from '../constants';

export function isRelationsSetting(
  settingName: ProfileSettingNameEnum
): boolean {
  return RELATION_SETTING_NAMES.includes(settingName);
}
