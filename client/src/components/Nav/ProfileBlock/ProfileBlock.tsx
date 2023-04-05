import type { ReactElement } from 'react';
import { useAppSelector } from '../../../hooks';
import Setting from './Setting/Setting';
import SettingsList from './SettingsList/SettingsList';

const ProfileBlock = (): ReactElement => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.settings.isUserInfoSetting
  );

  return isUserInfoSetting ? <Setting /> : <SettingsList />;
};

export default ProfileBlock;
