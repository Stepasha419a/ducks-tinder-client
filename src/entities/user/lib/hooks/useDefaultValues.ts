import type { Place } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import type { Setting } from '../../model/setting';

export function useDefaultValues():
  | string
  | number
  | boolean
  | string[]
  | Place {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const settingName = useAppSelector((state) => state.setting.settingName);

  return currentUser[settingName as Setting]!;
}
