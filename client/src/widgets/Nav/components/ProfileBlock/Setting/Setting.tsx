import type { ReactElement } from 'react';
import {
  ExternalForm,
  InterestsForm,
  RadioForm,
  TextareaForm,
  TextForm,
} from '@features/setting';
import { useAppSelector } from '@shared/lib/hooks';

export const Setting = (): ReactElement => {
  const settingType = useAppSelector((state) => state.setting.settingType);

  if (settingType === 'select') {
    return <InterestsForm />;
  }
  if (settingType === 'textarea') {
    return <TextareaForm />;
  }
  if (settingType === 'radio') {
    return <RadioForm />;
  }
  if (settingType === 'external') {
    return <ExternalForm />;
  }

  return <TextForm />;
};
