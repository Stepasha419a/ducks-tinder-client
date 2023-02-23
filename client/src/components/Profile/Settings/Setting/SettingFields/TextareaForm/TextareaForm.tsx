import { ChangeEvent, useEffect, useState } from 'react';
import {
  setInnerObjectName,
  setIsUserInfoSetting,
} from '../../../../../../redux/settings/settings.slice';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { updateUserThunk } from '../../../../../../redux/users/users.thunks';
import { Textarea } from '../../../../../ui';
import SettingWrapper from '../../SettingWrapper/SettingWrapper';
import styles from './TextareaForm.module.scss';

interface TextareaFormProps {
  formName: string;
  cancelHandler: () => void;
}

const TextareaForm: React.FC<TextareaFormProps> = ({
  formName,
  cancelHandler,
}) => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
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
    setInputValue(currentUser.description);
  }, [currentUser]);

  const submitSettings = () => {
    dispatch(
      updateUserThunk({
        currentUser,
        inputName: 'description',
        changedData: inputValue,
      })
    );
    dispatch(setIsUserInfoSetting(false));
    setInnerObjectName('');
  };

  const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValueError('');
    if (validation?.min && validation.max) {
      if (validation.max < value.length || value.length < validation.min) {
        setInputValueError(
          `${formName} has to be more ${validation.min} and less ${validation.max}`
        );
      }
    }
    if (!value.length) {
      setIsFormCloseable(false);
      setInputValueError(`${formName} can't be empty`);
    } else {
      !isFormCloseable && setIsFormCloseable(true);
    }
    setInputValue(value);
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
      <Textarea
        onChange={(e) => inputHandler(e)}
        onBlur={() => setInputValueDirty(true)}
        value={inputValue}
        extraClassName={styles.textarea}
      />
    </SettingWrapper>
  );
};

export default TextareaForm;
