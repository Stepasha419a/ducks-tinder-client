import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@entities/user';
import { ProfileSettingSelectNameEnum } from '@entities/user';
import { SelectSetting } from './components';

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
