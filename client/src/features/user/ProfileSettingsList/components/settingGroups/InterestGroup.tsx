import { SettingsGroup } from '@/entities/setting/components';
import type { FC, PropsWithChildren } from 'react';

export const InterestGroup: FC<PropsWithChildren> = ({ children }) => {
  return <SettingsGroup title="Interests">{children}</SettingsGroup>;
};
