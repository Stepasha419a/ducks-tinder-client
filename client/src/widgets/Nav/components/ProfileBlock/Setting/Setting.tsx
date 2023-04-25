import type { ReactElement } from 'react';
import {
  InterestsForm,
  RadioForm,
  TextareaForm,
  TextForm,
} from '@features/setting';
import { useAppSelector } from '@hooks';

export const Setting = (): ReactElement => {
  const setting = useAppSelector((state) => state.setting.setting);

  if (setting === 'select') {
    return <InterestsForm />;
  }
  if (setting === 'textarea') {
    return <TextareaForm />;
  }
  if (setting === 'radio') {
    return <RadioForm />;
  }

  return <TextForm />;
};
