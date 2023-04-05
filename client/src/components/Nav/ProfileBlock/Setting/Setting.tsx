import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { setIsUserInfoSetting } from '../../../../redux/settings/settings.slice';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

const ProfileSetting = (): ReactElement => {
  const dispatch = useAppDispatch();

  const setting = useAppSelector((state) => state.settings.setting);

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

export default ProfileSetting;
