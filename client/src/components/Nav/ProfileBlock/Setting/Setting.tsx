import { setIsUserInfoSetting } from '../../../../redux/settings/settings.slice';
import { useEffect } from 'react';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

const ProfileSetting = () => {
  const dispatch = useAppDispatch();

  const setting = useAppSelector((state) => state.settings.setting);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  if (setting === 'select') {
    return <InterestsForm />;
  } else if (setting === 'textarea') {
    return <TextareaForm />;
  } else if (setting === 'radio') {
    return <RadioForm />;
  }

  return <TextForm />;
};

export default ProfileSetting;
