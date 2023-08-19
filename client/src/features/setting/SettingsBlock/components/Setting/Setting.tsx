import type { ReactElement } from 'react';
import { RadioForm, TextareaForm, TextForm } from '@features/setting';
import { useAppSelector } from '@shared/lib/hooks';

export const Setting = (): ReactElement => {
  const settingType = useAppSelector((state) => state.setting.settingType);

  if (settingType === 'textarea') {
    return <TextareaForm />;
  }
  if (settingType === 'radio') {
    return <RadioForm />;
  }

  return <TextForm />;
};
