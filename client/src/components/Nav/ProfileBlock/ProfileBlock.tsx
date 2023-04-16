import type { ReactElement } from 'react';
import { useAppSelector } from '@hooks';
import Setting from './Setting/Setting';
import { SettingsList } from '@features/setting/';

const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.setting.isUserInfoSetting
  );

  return isUserInfoSetting ? <Setting /> : <SettingsList />;
};

export default ProfileBlock;
