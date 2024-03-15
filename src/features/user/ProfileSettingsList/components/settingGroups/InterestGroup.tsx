import { SettingsGroup } from '@entities/user/components';
import type { FC, PropsWithChildren } from 'react';

export const InterestGroup: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SettingsGroup
      descr="Choose the interests that you would like to share with your couples"
      title="Interests"
    >
      {children}
    </SettingsGroup>
  );
};
