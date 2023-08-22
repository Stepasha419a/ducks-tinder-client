import type { PartialUser } from '@/shared/api/interfaces';
import type { ProfileSettingName, ProfileSettingSelectName } from '../../model';
import { SELECT_SETTING_FIELDS } from '../constants';

export function getSelectSettingFields(
  settingName: ProfileSettingName
): ProfileSettingSelectName[] & PartialUser {
  return SELECT_SETTING_FIELDS[settingName];
}
