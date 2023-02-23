import { ChangeEvent, useEffect, useState } from 'react';
import { IUser, PartnerSettings } from '../../../../../../models/IUser';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../../../redux/settings/settings.slice';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { updateUserThunk } from '../../../../../../redux/users/users.thunks';
import { TextField } from '../../../../../ui';
import SettingWrapper from '../../SettingWrapper/SettingWrapper';
import styles from '../../Setting.module.scss';

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
    const value = e.target.value;
    setInputValueError('');
    if (validation?.min && validation.max) {
      if (validation.max < value.length || value.length < validation.min) {
        setInputValueError(`${formName} has to be more ${validation.min} and less ${validation.max}`);
      }
    }
    if (!value.length) {
      setIsFormCloseable(false);
      setInputValueError(`${formName} can't be empty`);
    } else {
      !isFormCloseable && setIsFormCloseable(true);
    }
    if (validation?.email && !regexp.test(String(value).toLowerCase())) {
      setInputValueError('Incorrect email');
    }
    setInputValue(value);
  };

  const submitSettings = () => {
    dispatch(
      updateUserThunk({
        currentUser,
        inputName: settingInputName!,
        changedData: inputValue,
        innerObjectName,
      })
    );
    dispatch(setIsUserInfoSetting(false));
    setInnerObjectName('');
  };

  useEffect(() => {
    if (!inputValue) {
      setIsFormCloseable(false);
      setInputValueError("Form can't be empty");
    } else {
      setIsFormCloseable(true);
    }
  }, [inputValue]);

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
        onKeyDown={() => setInputValueDirty(true)}
        value={inputValue}
        type="text"
        extraClassName={styles.textInput}
      />
    </SettingWrapper>
  );
};

export default TextInput;
