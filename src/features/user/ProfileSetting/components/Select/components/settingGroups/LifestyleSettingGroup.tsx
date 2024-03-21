import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@/entities/user/model/user';
import { SelectSetting } from '../SelectSetting/SelectSetting';

interface LifestyleSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const LifestyleSettingGroup: FC<LifestyleSettingGroupProps> = ({
  control,
}) => {
  return (
    <>
      <SelectSetting control={control} settingFieldName="pet" />
      <SelectSetting control={control} settingFieldName="alcoholAttitude" />
      <SelectSetting control={control} settingFieldName="smokingAttitude" />
      <SelectSetting control={control} settingFieldName="trainingAttitude" />
      <SelectSetting control={control} settingFieldName="foodPreference" />
      <SelectSetting
        control={control}
        settingFieldName="socialNetworksActivity"
      />
      <SelectSetting control={control} settingFieldName="chronotype" />
    </>
  );
};
