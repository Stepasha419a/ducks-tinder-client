import { useAppSelector } from '@/shared/lib/hooks';
import { useProfileSettingUrl } from '../lib';

export const ProfileSetting = () => {
  const settingType = useAppSelector(
    (state) => state.user.profileSetting.settingType
  );

  const isFound = useProfileSettingUrl();

  if (!isFound) {
    return <div>not found</div>;
  }

  if (settingType === 'radio') {
    return <div>radio</div>;
  }

  return <div>select</div>;
};
