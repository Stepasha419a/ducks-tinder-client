import type { FC, PropsWithChildren } from 'react';
import { SettingsGroup } from '@/entities/user/components';

export const LifestyleGroup: FC<PropsWithChildren> = ({ children }) => {
  return <SettingsGroup title="Lifestyle">{children}</SettingsGroup>;
};
