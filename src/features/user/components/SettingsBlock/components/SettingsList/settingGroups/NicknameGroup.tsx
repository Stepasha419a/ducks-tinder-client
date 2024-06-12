import type { FC, PropsWithChildren } from 'react';
import { SettingsGroup } from '@entities/user/components';

export const NicknameGroup: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SettingsGroup
      title="Account Settings"
      descr="Verified email address helps to protect your account"
    >
      {children}
    </SettingsGroup>
  );
};
