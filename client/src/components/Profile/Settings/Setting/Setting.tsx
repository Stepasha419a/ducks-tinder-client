import TextInput from './SettingFields/TextInput/TextInput';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../redux/settings/settings.slice';
import RadioInputs from './SettingFields/RadioInputs/RadioInputs';
import TextareaForm from './SettingFields/TextareaForm/TextareaForm';
import { useEffect } from 'react';

interface ProfileSettingPropsInterface {
  formName: string;
}

const ProfileSetting: React.FC<ProfileSettingPropsInterface> = ({
  formName,
}) => {
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
    };
  });

  /* if (settingInputName === 'interests') {
    return (
      <InterestsSetting
        currentUser={currentUser}
        isFormValid={isFormValid}
        isFormCloseable={isFormCloseable}
        submitSettings={submitSettings}
        cancelHandler={cancelHandler}
      />
    );
  } else }*/
  if (settingInputName === 'description') {
    return <TextareaForm formName={formName} cancelHandler={cancelHandler} />;
  }

  if (settingInputName === 'preferSex' || settingInputName === 'sex') {
    return <RadioInputs formName={formName} cancelHandler={cancelHandler} />;
  }

  return <TextInput formName={formName} cancelHandler={cancelHandler} />;
};

export default ProfileSetting;
