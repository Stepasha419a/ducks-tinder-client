import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import { Setting } from './Setting/Setting';
import { SettingsList } from './SettingsList/SettingsList';

export const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );

  return isUserInfoSetting ? <Setting /> : <SettingsList />;
};
