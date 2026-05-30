import type { Place, Setting, User } from '@ducks-tinder-client/common';

import { SettingNameEnum } from '../constants';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '@shared/lib';
import { useAuthStore, useUserStore } from '@ducks-tinder-client/auth';

export function useDefaultValues(
  settingName: Setting | null
): string | number | boolean | string[] | Place | null {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || SupportedLanguage.English;
  const currentUser = useUserStore((state) => state.currentUser);
  const email = useAuthStore((state) => state.authData?.email);

  if (!currentUser || !email) {
    return null;
  }

  if (!settingName) {
    return null;
  }

  if (settingName === SettingNameEnum.EMAIL) {
    return email;
  }
  if (settingName === SettingNameEnum.LANGUAGE) {
    return language;
  }

  return currentUser[settingName as keyof User] as
    | string
    | number
    | boolean
    | string[]
    | Place
    | null;
}
