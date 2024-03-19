import type { Place } from '@shared/api/interfaces';
import { useAppSelector } from '@shared/lib/hooks';
import type { Setting } from '../../model/setting';

export function useDefaultValues(
  settingName: Setting
): string | number | boolean | string[] | Place | null {
  const currentUser = useAppSelector((state) => state.user.currentUser!);

  return currentUser[settingName];
}
