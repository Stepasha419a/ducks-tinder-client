import type { ProfileSettingSelectName } from '@/entities/user/model/user';
import { PROFILE_SETTING_TITLES } from '../constants';

export function getProfileSettingTitles(
  settingName: ProfileSettingSelectName
): string {
  return PROFILE_SETTING_TITLES[settingName];
}
