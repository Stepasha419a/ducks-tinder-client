import { useAppSelector } from '@/shared/lib/hooks';
import type { SelectItem } from '../../model';

export function useDefaultProfileValues():
  | string
  | number
  | boolean
  | SelectItem[] {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const settingName = useAppSelector(
    (state) => state.user.profileSetting.settingName
  );

  return currentUser[settingName!];
}
