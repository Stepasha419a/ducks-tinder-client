import { useAppSelector } from '@shared/lib/hooks';
import { useProfileSettingUrl } from '@entities/setting/lib';
import { NotFoundSetting } from '@entities/setting/components';
import { ROUTES } from '@shared/lib/constants';
import { SelectForm } from './components';

export const ProfileSetting = () => {
  const settingType = useAppSelector(
    (state) => state.setting.profileSetting.settingType
  );

  const isFound = useProfileSettingUrl();
  if (!isFound) {
    return <NotFoundSetting url={`${ROUTES.profile}/edit`} />;
  }

  if (settingType === 'radio') {
    return <div>radio</div>;
  }

  return <SelectForm />;
};
