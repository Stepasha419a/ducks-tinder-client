import { useAppSelector } from '@/shared/lib/hooks';
import type { SelectItem } from '@entities/setting/model';

export function useDefaultProfileValues():
  | string
  | number
  | boolean
  | SelectItem[] {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const settingName = useAppSelector(
    (state) => state.setting.profileSetting.settingName
  );

  return currentUser[settingName!];
}
