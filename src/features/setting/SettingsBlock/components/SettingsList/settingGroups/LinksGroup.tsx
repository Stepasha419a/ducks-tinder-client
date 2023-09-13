import type { FC, PropsWithChildren, ReactElement } from 'react';
import { SettingsGroup } from '@entities/setting/components';

export const LinksGroup: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return <SettingsGroup title="Safety Tips">{children}</SettingsGroup>;
};
