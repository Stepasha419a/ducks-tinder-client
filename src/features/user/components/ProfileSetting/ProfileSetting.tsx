import { useProfileSettingUrl } from '@entities/user/lib';
import { NotFoundSetting } from '@entities/user/components';
import { ROUTES } from '@shared/lib/constants';
import { SelectForm } from './components';

export const ProfileSetting = () => {
  const profileSetting = useProfileSettingUrl();
  if (!profileSetting) {
    return <NotFoundSetting url={`${ROUTES.PROFILE}/edit`} />;
  }

  if (profileSetting.settingType === 'radio') {
    return <div>radio</div>;
  }

  return <SelectForm />;
};
