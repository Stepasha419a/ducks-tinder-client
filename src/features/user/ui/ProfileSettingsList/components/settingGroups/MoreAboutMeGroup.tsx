import type { FC, PropsWithChildren } from 'react';
import { SettingsGroup } from '@entities/user/ui';

export const MoreAboutMeGroup: FC<PropsWithChildren> = ({ children }) => {
  return <SettingsGroup title="More about me">{children}</SettingsGroup>;
};
