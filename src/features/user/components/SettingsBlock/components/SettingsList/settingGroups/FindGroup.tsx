import type { FC, PropsWithChildren, ReactElement } from 'react';
import { SettingsGroup } from '@entities/user/components';

export const FindGroup: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <SettingsGroup
      title="Find Settings"
      descr="When the local profiles are over, you will be able to switch to the
    Global Mode for dating people from all over the world."
    >
      {children}
    </SettingsGroup>
  );
};
