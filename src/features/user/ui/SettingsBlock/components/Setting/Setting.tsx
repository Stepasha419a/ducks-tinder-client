import type { FC } from 'react';
import { RadioForm, TextareaForm, TextForm } from '@features/user';
import type { SettingNameEnum } from '@entities/user';
import { SettingTypeEnum } from '@entities/user';
import { getSettingType } from '@entities/user';

interface SettingProps {
  settingName: SettingNameEnum;
}

export const Setting: FC<SettingProps> = ({ settingName }) => {
  const settingType = getSettingType(settingName);

  if (settingType === SettingTypeEnum.TEXTAREA) {
    return <TextareaForm />;
  }
  if (settingType === SettingTypeEnum.RADIO) {
    return <RadioForm />;
  }

  return <TextForm />;
};
