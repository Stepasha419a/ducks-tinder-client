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

  const setting = useAppSelector((state) => state.setting.setting);
  const currentSetting = useAppSelector((state) => state.setting.setting);

  useEffect(() => {
    return () => {
      // not to close custom forms (uses main window for settings instead of nav)
      if (currentSetting !== 'hidden') {
        dispatch(nullInput());
      }
    };
  });

  if (setting === 'select') {
    return <InterestsForm />;
  }
  if (setting === 'textarea') {
    return <TextareaForm />;
  }
  if (setting === 'radio') {
    return <RadioForm />;
  }
  if (setting === 'hidden') {
    return <HiddenForm />;
  }

  return <TextForm />;
};
