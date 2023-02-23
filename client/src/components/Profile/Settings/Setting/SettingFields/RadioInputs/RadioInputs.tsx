import { useEffect, useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../../models/IUser';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { RadioInput } from '../../../../../ui';
import SettingWrapper from '../../SettingWrapper/SettingWrapper';
import styles from './RadioInputs.module.scss';

interface RadioInputsProps {
  formName: string;
  cancelHandler: () => void;
}

const RadioInputs: React.FC<RadioInputsProps> = ({
  formName,
  cancelHandler,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.settings.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );

  const [inputValue, setInputValue] = useState('');
  const [inputValueError, setInputValueError] = useState('');
  const [isFormCloseable, setIsFormCloseable] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (inputValueError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [inputValueError]);

  useEffect(() => {
    setInputValue(
      innerObjectName
        ? currentUser[innerObjectName][
            settingInputName as keyof PartnerSettings
          ].toString()
        : currentUser[settingInputName as keyof IUser].toString()
    );
  }, [innerObjectName, currentUser, settingInputName]);

  useEffect(() => {
    if (!inputValue) {
      setIsFormValid(false);
      setIsFormCloseable(false);
      setInputValueError("Form can't be empty");
    } else {
      setIsFormValid(true);
      setIsFormCloseable(true);
      setInputValueError('');
    }
  }, [inputValue]);

  const submitSettings = () => {
    dispatch(submitSettingsThunk({ changedData: inputValue }));
    dispatch(setIsUserInfoSetting(false));
    setInnerObjectName('');
  };

  return (
    <SettingWrapper
      formName={formName}
      cancelHandler={cancelHandler}
      inputValueDirty={true}
      inputValueError={inputValueError}
      isFormCloseable={isFormCloseable}
      isFormValid={isFormValid}
      submitSettings={submitSettings}
    >
      <RadioInput
        name={settingInputName!}
        value="male"
        checked={inputValue === 'male'}
        onChange={() => setInputValue('male')}
        text="Male"
        extraClassName={styles.radioInput}
      />
      <RadioInput
        name={settingInputName!}
        value="female"
        checked={inputValue === 'female'}
        onChange={() => setInputValue('female')}
        text="Female"
        extraClassName={styles.radioInput}
      />
    </SettingWrapper>
  );
};

export default RadioInputs;
