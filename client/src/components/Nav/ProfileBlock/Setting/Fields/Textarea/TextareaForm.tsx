import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import { Textarea } from '../../../../../ui';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './TextareaForm.module.scss';

export const TextareaForm = () => {
  const validation = useAppSelector((state) => state.settings.validaton);
  const formName = useAppSelector((state) => state.settings.formName);

  const [inputValue, setInputValue] = useState('');
  const [inputValueDirty, setInputValueDirty] = useState(false);
  const [inputValueError, setInputValueError] = useState('');
  const [isFormCloseable, setIsFormCloseable] = useState(true);

  const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <Textarea
        onChange={(e) => inputHandler(e)}
        onKeyDown={() => !inputValueDirty && setInputValueDirty(true)}
        value={inputValue}
        extraClassName={styles.textarea}
      />
    </SettingWrapper>
  );
};
