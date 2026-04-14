import type { FC } from 'react';

import {
  SettingNameEnum,
  getSettingType,
  SettingTypeEnum,
} from '@entities/user';

import { RadioForm, TextareaForm, TextForm } from './components';
import { SelectLanguage } from './components/SelectLanguage/SelectLanguage';

interface SettingProps {
  settingName: SettingNameEnum;
}

export const Setting: FC<SettingProps> = ({ settingName }) => {
  const settingType = getSettingType(settingName);

  if (settingName === SettingNameEnum.LANGUAGE) {
    return <SelectLanguage />;
  }

  if (settingType === SettingTypeEnum.TEXTAREA) {
    return <TextareaForm />;
  }
  if (settingType === SettingTypeEnum.RADIO) {
    return <RadioForm />;
  }

  return <TextForm />;
};
