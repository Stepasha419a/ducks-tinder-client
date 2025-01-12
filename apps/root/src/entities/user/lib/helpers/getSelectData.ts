import type { ProfileSettingSelectNameEnum } from '../constants';
import { SELECT_VALIDATION } from '../constants';
import { SELECT_LISTS } from '../constants';

export function getSelectData(
  selectSettingField: ProfileSettingSelectNameEnum
) {
  const list = SELECT_LISTS[selectSettingField];
  const validation = SELECT_VALIDATION[selectSettingField];
  return { list, validation };
}
