import type { ReactElement } from 'react';
import { useEffect } from 'react';
import {
  InterestsForm,
  RadioForm,
  TextareaForm,
  TextForm,
} from '@features/setting';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setIsUserInfoSetting } from '@entities/setting/model';

export const Setting = (): ReactElement => {
  const dispatch = useAppDispatch();

  const setting = useAppSelector((state) => state.setting.setting);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
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

  return <TextForm />;
};
