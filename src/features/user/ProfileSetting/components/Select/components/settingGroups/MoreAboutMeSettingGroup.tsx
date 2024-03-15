import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type { MultiSelectForm } from '@/entities/user/model/setting';
import { SelectSetting } from '../SelectSetting/SelectSetting';

interface MoreAboutMeSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const MoreAboutMeSettingGroup: FC<MoreAboutMeSettingGroupProps> = ({
  control,
}) => {
  return (
    <>
      <SelectSetting control={control} settingFieldName="zodiacSign" />
      <SelectSetting control={control} settingFieldName="education" />
      <SelectSetting control={control} settingFieldName="childrenAttitude" />
      <SelectSetting control={control} settingFieldName="personalityType" />
      <SelectSetting control={control} settingFieldName="communicationStyle" />
      <SelectSetting control={control} settingFieldName="attentionSign" />
    </>
  );
};
