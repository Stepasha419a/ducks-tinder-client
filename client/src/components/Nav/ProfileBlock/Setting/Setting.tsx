import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { setIsUserInfoSetting } from '../../../../redux/settings/settings.slice';
import { useEffect } from 'react';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';

const ProfileSetting = () => {
  const dispatch = useAppDispatch();

  const kindOfSetting = useAppSelector((state) => state.settings.kindOfSetting);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  if (kindOfSetting === 'select') {
    return <InterestsForm />;
  } else if (kindOfSetting === 'textarea') {
    return <TextareaForm />;
  } else if (kindOfSetting === 'radio') {
    return <RadioForm />;
  }

  return <TextForm />;
};

export default ProfileSetting;
