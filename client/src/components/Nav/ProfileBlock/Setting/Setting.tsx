import { useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  setIsUserInfoSetting,
  submitSettingsThunk,
} from '@entities/setting/model';
import type { ChangedData } from '@shared/api/interfaces';
import { InterestsForm, RadioForm, TextareaForm, TextForm } from './Fields';
import { useAppDispatch, useAppSelector } from '@hooks';

const ProfileSetting = (): ReactElement => {
  const dispatch = useAppDispatch();

  const setting = useAppSelector((state) => state.setting.setting);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  const cancelFormHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
  };

  const submitFormHandler = (changedData: ChangedData) => {
    dispatch(submitSettingsThunk({ changedData }));
  };

  if (setting === 'select') {
    return (
      <InterestsForm
        cancelFormHandler={cancelFormHandler}
        submitFormHandler={submitFormHandler}
      />
    );
  }
  if (setting === 'textarea') {
    return (
      <TextareaForm
        cancelFormHandler={cancelFormHandler}
        submitFormHandler={submitFormHandler}
      />
    );
  }
  if (setting === 'radio') {
    return (
      <RadioForm
        cancelFormHandler={cancelFormHandler}
        submitFormHandler={submitFormHandler}
      />
    );
  }

  return (
    <TextForm
      cancelFormHandler={cancelFormHandler}
      submitFormHandler={submitFormHandler}
    />
  );
};

export default ProfileSetting;
