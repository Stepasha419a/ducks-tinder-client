import type { ProfileSettingSelectName } from '@/entities/setting/model';
import { PROFILE_SETTING_TITLES } from '../constants';

export function getProfileSettingTitles(
  settingName: ProfileSettingSelectName
): string {
  return PROFILE_SETTING_TITLES[settingName];
}
