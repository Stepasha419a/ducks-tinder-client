import type { FC, PropsWithChildren } from 'react';

import { SettingsGroup } from '@entities/user';
import { useTranslation } from 'react-i18next';

export const InterestGroup: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <SettingsGroup
      descr={t('profile.settings.interests.description')}
      title={t('profile.settings.interests.title')}
    >
      {children}
    </SettingsGroup>
  );
};
