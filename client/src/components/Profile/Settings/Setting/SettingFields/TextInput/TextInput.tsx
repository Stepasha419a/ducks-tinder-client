import { ChangeEvent, useEffect, useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../../models/IUser';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { TextField } from '../../../../../ui';
import SettingWrapper from '../../SettingWrapper/SettingWrapper';
import styles from './TextInput.module.scss';

interface TextInputProps {
  formName: string;
  cancelHandler: () => void;
}

const regexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const TextInput: React.FC<TextInputProps> = ({ formName, cancelHandler }) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const innerObjectName = useAppSelector(
    (state) => state.settings.innerObjectName
  );
  const settingInputName = useAppSelector(
    (state) => state.settings.settingInputName
  );
  const validation = useAppSelector((state) => state.settings.validaton);

  const [inputValue, setInputValue] = useState('');
  const [inputValueDirty, setInputValueDirty] = useState(false);
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

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, ' ');
    const length = value.length;
    setInputValueError('');
    if (!length) {
      setIsFormCloseable(false);
      setInputValueError(`${formName} can't be empty`);
    } else {
      if (validation?.min && validation.max) {
        if (validation.max < length || length < validation.min) {
          setInputValueError(
            `${formName} has to be more ${validation.min} and less ${validation.max}`
          );
        }
      }
      !isFormCloseable && setIsFormCloseable(true);
    }
    if (validation?.email && !regexp.test(String(value).toLowerCase())) {
      setInputValueError('Incorrect email');
    }
    setInputValue(value);
  };

  const submitSettings = () => {
    dispatch(submitSettingsThunk({ changedData: inputValue.trim() }));
    dispatch(setIsUserInfoSetting(false));
    setInnerObjectName('');
  };

  return (
    <SettingWrapper
      formName={formName}
      cancelHandler={cancelHandler}
      inputValueDirty={inputValueDirty}
      inputValueError={inputValueError}
      isFormCloseable={isFormCloseable}
      isFormValid={isFormValid}
      submitSettings={submitSettings}
    >
      <TextField
        onChange={(e) => inputHandler(e)}
        onKeyDown={() => !inputValueDirty && setInputValueDirty(true)}
        value={inputValue}
        type="text"
        extraClassName={styles.textInput}
      />
    </SettingWrapper>
  );
};

export default TextInput;
