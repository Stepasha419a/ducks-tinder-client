import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsGroup } from '@entities/user';

export const FindGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup
      title={t('profile.settings.find.title')}
      descr={t('profile.settings.find.descr')}
    >
      {children}
    </SettingsGroup>
  );
};
