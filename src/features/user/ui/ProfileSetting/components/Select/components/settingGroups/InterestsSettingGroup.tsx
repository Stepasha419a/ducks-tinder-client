import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { SelectSetting } from '../SelectSetting/SelectSetting';
import type { MultiSelectForm } from '@entities/user/lib';
import { ProfileSettingSelectNameEnum } from '@entities/user/lib';

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
