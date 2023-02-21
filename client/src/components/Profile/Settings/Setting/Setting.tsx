import { IUser, PartnerSettings } from '../../../../models/IUser';
import InterestsSetting from './SettingFields/Interests/IterestsSetting';
import TextInput from './SettingFields/TextInput/TextInput';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  IUserInnerKey,
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../redux/settings/settings.slice';
import RadioInputs from './SettingFields/RadioInputs/RadioInputs';

interface ProfileSettingPropsInterface {
  currentUser: IUser;
  submitSettings: (
    inputName: keyof IUser | keyof PartnerSettings,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: IUserInnerKey
  ) => void;
  formName: string;
}

const ProfileSetting: React.FC<ProfileSettingPropsInterface> = ({
  currentUser,
  submitSettings,
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
  } else if (settingInputName === 'description') {
    return (
      <Textarea
        inputValueDirty={inputValueDirty}
        inputValueError={inputValueError}
        inputHandler={inputHandler}
        setInputValueDirty={setInputValueDirty}
        inputValue={inputValue}
        isFormValid={isFormValid}
        isFormCloseable={isFormCloseable}
        submitSettings={submitSettings}
        cancelHandler={cancelHandler}
      /> 
    );
  }*/

  if (settingInputName === 'preferSex' || settingInputName === 'sex') {
    return <RadioInputs formName={formName} cancelHandler={cancelHandler} />;
  }

  return <TextInput formName={formName} cancelHandler={cancelHandler} />;
};

export default ProfileSetting;
