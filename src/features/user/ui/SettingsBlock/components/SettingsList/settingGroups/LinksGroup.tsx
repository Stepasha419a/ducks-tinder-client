import type { FC, PropsWithChildren, ReactElement } from 'react';
import { SettingsGroup } from '@entities/user/ui';

export const LinksGroup: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return <SettingsGroup title="Safety Tips">{children}</SettingsGroup>;
};
