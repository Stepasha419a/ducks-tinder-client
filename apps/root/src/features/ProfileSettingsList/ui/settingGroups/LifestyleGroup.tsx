import type { FC, PropsWithChildren } from 'react';

import { SettingsGroup } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const LifestyleGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup title={t('profile.settings.lifestyle.title')}>
      {children}
    </SettingsGroup>
  );
};
