import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { setIsUserInfoSetting } from '../../../../redux/settings/settings.slice';
import { useEffect } from 'react';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';

const ProfileSetting = () => {
  const dispatch = useAppDispatch();

  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  if (settingInputName === 'interests') {
    return <InterestsForm />;
  } else if (settingInputName === 'description') {
    return <TextareaForm />;
  } else if (settingInputName === 'preferSex' || settingInputName === 'sex') {
    return <RadioForm />;
  }

  return <TextForm />;
};

export default ProfileSetting;
