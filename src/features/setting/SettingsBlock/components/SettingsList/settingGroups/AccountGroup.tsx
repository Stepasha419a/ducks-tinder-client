import type { FC, PropsWithChildren, ReactElement } from 'react';
import { SettingsGroup } from '@entities/setting/components';

export const AccountGroup: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <SettingsGroup
      title="Account Settings"
      descr="Verified email address helps to protect your account"
    >
      {children}
    </SettingsGroup>
  );
};