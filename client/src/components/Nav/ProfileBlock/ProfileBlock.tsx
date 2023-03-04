import { useAppSelector } from '../../../hooks';
import Setting from './Setting/Setting';
import SettingsList from './SettingsList/SettingsList';

const ProfileBlock = () => {
  const isUserInfoSetting = useAppSelector(
    (state) => state.settings.isUserInfoSetting
  );

  return isUserInfoSetting ? <Setting /> : <SettingsList />;
};

export default ProfileBlock;
