import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@entities/user/model/setting';
import { SelectSetting } from '../SelectSetting/SelectSetting';

interface InterestsSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const InterestsSettingGroup: FC<InterestsSettingGroupProps> = ({
  control,
}) => {
  return <SelectSetting control={control} settingFieldName="interests" />;
};
