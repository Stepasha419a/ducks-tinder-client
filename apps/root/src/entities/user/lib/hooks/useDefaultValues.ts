import type { Place, Setting } from '@ducks-tinder-client/common';
import { useAppSelector } from '@ducks-tinder-client/common';

import { SettingNameEnum } from '../constants';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '@shared/lib';

export function useDefaultValues(
  settingName: Setting | null
): string | number | boolean | string[] | Place | null {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || SupportedLanguage.English;
  const currentUser = useAppSelector((state) => state.user.currentUser!);
  const email = useAppSelector((state) => state.auth.authData!.email);

  if (!settingName) {
    return null;
  }

  if (settingName === SettingNameEnum.EMAIL) {
    return email;
  }
  if (settingName === SettingNameEnum.LANGUAGE) {
    return language;
  }

  return currentUser[settingName];
}
