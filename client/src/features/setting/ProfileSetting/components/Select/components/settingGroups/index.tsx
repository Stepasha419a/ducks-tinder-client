import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@/entities/setting/model';
import { useAppSelector } from '@/shared/lib/hooks';
import { InterestsSettingGroup } from './InterestsSettingGroup';

interface SettingsGroupProps {
  control: Control<MultiSelectForm>;
}

export const SettingsGroup: FC<SettingsGroupProps> = ({ control }) => {
  const settingName = useAppSelector(
    (state) => state.setting.profileSetting.settingName
  );

  switch (settingName) {
    case 'interests':
      return <InterestsSettingGroup control={control} />;
    default:
      return <div>not found group</div>;
  }
};
