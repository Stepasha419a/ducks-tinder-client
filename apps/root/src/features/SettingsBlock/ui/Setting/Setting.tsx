import type { FC } from 'react';

import type { SettingNameEnum } from '@entities/user';
import { getSettingType,SettingTypeEnum  } from '@entities/user';

import { RadioForm, TextareaForm, TextForm } from './components';

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
