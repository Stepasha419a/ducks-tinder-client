import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { InterestsSettingGroup } from './InterestsSettingGroup';
import { MoreAboutMeSettingGroup } from './MoreAboutMeSettingGroup';
import { LifestyleSettingGroup } from './LifestyleSettingGroup';
import type { MultiSelectForm } from '@/entities/user/lib';
import { useProfileSettingUrl } from '@/entities/user/lib';
import { ProfileSettingNameEnum } from '@/entities/user/lib/constants';

interface SettingsGroupProps {
  control: Control<MultiSelectForm>;
}

export const SettingsGroup: FC<SettingsGroupProps> = ({ control }) => {
  const profileSetting = useProfileSettingUrl()!;

  switch (profileSetting.settingName) {
    case ProfileSettingNameEnum.INTERESTS:
      return <InterestsSettingGroup control={control} />;
    case ProfileSettingNameEnum.MORE_ABOUT_ME:
      return <MoreAboutMeSettingGroup control={control} />;
    case ProfileSettingNameEnum.LIFESTYLE:
      return <LifestyleSettingGroup control={control} />;
    default:
      return <div>not found group</div>;
  }
};
