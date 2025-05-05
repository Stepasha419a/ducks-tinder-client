import type { FC } from 'react';
import type { Control } from 'react-hook-form';

import type { MultiSelectForm } from '@entities/user';
import { ProfileSettingSelectNameEnum } from '@entities/user';

import { SelectSetting } from './components';

interface MoreAboutMeSettingGroupProps {
  control: Control<MultiSelectForm>;
}

export const MoreAboutMeSettingGroup: FC<MoreAboutMeSettingGroupProps> = ({
  control,
}) => {
  return (
    <>
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.ZODIAC_SIGN}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.EDUCATION}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.CHILDREN_ATTITUDE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.PERSONAL_TYPE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.COMMUNICATION_STYLE}
      />
      <SelectSetting
        control={control}
        settingFieldName={ProfileSettingSelectNameEnum.ATTENTION_SIGN}
      />
    </>
  );
};
