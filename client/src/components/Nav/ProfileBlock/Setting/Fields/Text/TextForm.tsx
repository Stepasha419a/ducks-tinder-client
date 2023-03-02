import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '../../../../../../redux/store';
import { TextField } from '../../../../../ui';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import { IMAIL_REGEXP } from './TextForm.constants';
import styles from './TextForm.module.scss';

export const TextForm = () => {
  const validation = useAppSelector((state) => state.settings.validaton);
  const formName = useAppSelector((state) => state.settings.formName);

  const [inputValue, setInputValue] = useState('');
  const [inputValueDirty, setInputValueDirty] = useState(false);
  const [inputValueError, setInputValueError] = useState('');
  const [isFormCloseable, setIsFormCloseable] = useState(true);

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
    if (validation?.email && !IMAIL_REGEXP.test(String(value).toLowerCase())) {
      setInputValueError('Incorrect email');
    }
    setInputValue(value);
  };

  return (
    <SettingWrapper
      formName={formName}
      inputValueDirty={inputValueDirty}
      inputValueError={inputValueError}
      isFormCloseable={isFormCloseable}
      inputValue={inputValue}
      setInputValue={
        setInputValue as Dispatch<SetStateAction<string | string[]>>
      }
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
