import type { Place } from '@ducks-tinder-client/common';

import { useAppSelector } from '@shared/lib';

import type { Setting } from '../../model';
import { SettingNameEnum } from '../constants';

export function useDefaultValues(
  settingName: Setting
): string | number | boolean | string[] | Place | null {
  const currentUser = useAppSelector((state) => state.user.currentUser!);
  const email = useAppSelector((state) => state.auth.authData!.email);

  if (settingName === SettingNameEnum.EMAIL) {
    return email;
  }

  return currentUser[settingName];
}
