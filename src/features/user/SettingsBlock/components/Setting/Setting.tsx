import type { FC } from 'react';
import { RadioForm, TextareaForm, TextForm } from '@features/user';
import type { SettingTypeEnum } from '@/entities/user/model/setting/setting.interfaces';

interface SettingProps {
  settingType: SettingTypeEnum;
}

export const Setting: FC<SettingProps> = ({ settingType }) => {
  if (settingType === 'textarea') {
    return <TextareaForm />;
  }
  if (settingType === 'radio') {
    return <RadioForm />;
  }

  return <TextForm />;
};
