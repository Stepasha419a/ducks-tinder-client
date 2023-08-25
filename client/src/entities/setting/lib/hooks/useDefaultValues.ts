import type { NameObject, Place } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import type { Setting } from '../../model';

export function useDefaultValues():
  | string
  | number
  | boolean
  | NameObject[]
  | Place {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const settingName = useAppSelector((state) => state.setting.settingName);

  return currentUser[settingName as Setting]!;
}
