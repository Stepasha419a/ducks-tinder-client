import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsGroup } from '@entities/user';

export const DisplayGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup title={t('profile.settings.display.title')}>
      {children}
    </SettingsGroup>
  );
};
