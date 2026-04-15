import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsGroup } from '@entities/user';

export const AccountGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup
      title={t('profile.settings.account.title')}
      descr={t('profile.settings.account.descr')}
    >
      {children}
    </SettingsGroup>
  );
};
