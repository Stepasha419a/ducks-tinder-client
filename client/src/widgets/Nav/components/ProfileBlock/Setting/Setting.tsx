import type { ReactElement } from 'react';
import { useEffect } from 'react';
import {
  HiddenForm,
  InterestsForm,
  RadioForm,
  TextareaForm,
  TextForm,
} from '@features/setting';
import { useAppDispatch, useAppSelector } from '@hooks';
import { nullInput } from '@entities/setting/model';

export const Setting = (): ReactElement => {
  const dispatch = useAppDispatch();

  const settingType = useAppSelector((state) => state.setting.settingType);

  useEffect(() => {
    return () => {
      // not to close custom forms (uses main window for settings instead of nav)
      if (settingType !== 'hidden') {
        dispatch(nullInput());
      }
    };
  });

  if (settingType === 'select') {
    return <InterestsForm />;
  }
  if (settingType === 'textarea') {
    return <TextareaForm />;
  }
  if (settingType === 'radio') {
    return <RadioForm />;
  }
  if (settingType === 'hidden') {
    return <HiddenForm />;
  }

  return <TextForm />;
};
