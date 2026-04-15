import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsGroup } from '@entities/user';

export const LinksGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup
      title={t('profile.settings.safety.title')}
      descr={t('profile.settings.safety.descr')}
    >
      {children}
    </SettingsGroup>
  );
};
