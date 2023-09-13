import type { ProfileSettingSelectName } from '../../model';
import { SELECT_LISTS, SELECT_VALIDATION } from '../constants';

export function getSelectData(selectSettingField: ProfileSettingSelectName) {
  const list = SELECT_LISTS[selectSettingField];
  const validation = SELECT_VALIDATION[selectSettingField];
  return { list, validation };
}
