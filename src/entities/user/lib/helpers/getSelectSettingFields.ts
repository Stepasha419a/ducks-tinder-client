import type {
  ProfileSettingName,
  ProfileSettingSelectName,
} from '../../model/setting';
import { SELECT_SETTING_FIELDS } from '../constants';

export function getSelectSettingFields(
  settingName: ProfileSettingName
): ProfileSettingSelectName[] {
  return SELECT_SETTING_FIELDS[settingName];
}
