import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { SelectSetting } from '../SelectSetting/SelectSetting';
import type { MultiSelectForm } from '@/entities/user/lib';
import { ProfileSettingSelectNameEnum } from '@/entities/user/lib';

interface LifestyleSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const LifestyleSettingGroup: FC<LifestyleSettingGroupProps> = ({
  control,
}) => {
  return (
    <>
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.PET}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.ALCOHOL_ATTITUDE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.SMOKING_ATTITUDE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.TRAINING_ATTITUDE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.FOOD_PREFERENCE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.SOCIAL_NETWORK_ACTIVITY}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.CHRONOTYPE}
      />
    </>
  );
};
