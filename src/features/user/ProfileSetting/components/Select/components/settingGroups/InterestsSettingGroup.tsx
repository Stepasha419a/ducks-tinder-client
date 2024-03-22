import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@entities/user/model/user';
import { SelectSetting } from '../SelectSetting/SelectSetting';
import { ProfileSettingSelectNameEnum } from '@/entities/user/lib';

interface InterestsSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const InterestsSettingGroup: FC<InterestsSettingGroupProps> = ({
  control,
}) => {
  return (
    <SelectSetting
      control={control}
      settingFieldName={ProfileSettingSelectNameEnum.INTERESTS}
    />
  );
};
