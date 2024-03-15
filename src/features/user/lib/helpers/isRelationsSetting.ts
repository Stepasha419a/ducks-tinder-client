import type { ProfileSettingName } from '@/entities/user/model/setting';
import { RELATION_SETTING_NAMES } from '../constants';

export function isRelationsSetting(settingName: ProfileSettingName): boolean {
  return RELATION_SETTING_NAMES.includes(settingName);
}
