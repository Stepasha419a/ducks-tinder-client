import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../redux/settings/settings.slice';
import { useEffect } from 'react';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';

const ProfileSetting = () => {
  const dispatch = useAppDispatch();

  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  const cancelHandler = () => {
    dispatch(setInnerObjectName(null));
    dispatch(setIsUserInfoSetting(false));
  };

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
      dispatch(setInnerObjectName(null));
    };
  });

  if (settingInputName === 'interests') {
    return <InterestsForm cancelHandler={cancelHandler} />;
  } else if (settingInputName === 'description') {
    return <TextareaForm cancelHandler={cancelHandler} />;
  } else if (settingInputName === 'preferSex' || settingInputName === 'sex') {
    return <RadioForm cancelHandler={cancelHandler} />;
  }

  return <TextForm cancelHandler={cancelHandler} />;
};

export default ProfileSetting;
